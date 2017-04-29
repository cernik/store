// @flow
import { Map, Record } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import StorageManager from './StorageManager';

type State = Map | Record;

type Action = {
  type: string,
  data?: Object
};

type StoreProps = {
  name: string,
  initialData: Object,
  storage?: boolean,
};

class Store extends ReduceStore{

  constructor(props: StoreProps): void {
    super(Dispatcher);
    this.props = props;

    const { name, value } = this.props;
    Dispatcher.dispatch({type: `${name}/create`, data: value});
  }

  getInitialState(): State {
    return Map();
  }

  reduce(state: State, action: Action): State {
    const { name } = this.props;

    switch (action.type) {
      case `${name}/create`:{

        if ( this.props.storage ){
          StorageManager.create(name)
          .then( data => { !!data && Dispatcher.dispatch({ type: `${name}/created`, data }) });
        }

        return state.set('value',action.data);
      }
			case `${name}/update`:{

        if ( this.props.storage ){
          StorageManager.update(name, action.data)
          .then( data => { !!data && Dispatcher.dispatch({ type: `${name}/updated`, data }) });
        }

        return state;
      }
      case `${name}/created`:
			case `${name}/updated`:{
        return state.update('value', value => value.merge(action.data));
      }
      case `${name}/delete`:
      default:
        return state;
    }
  }
}

export default Store;
