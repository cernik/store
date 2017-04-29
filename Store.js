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
  initialCreate: boolean,
  initialData: Object,
  storage?: boolean,
};

class Store extends ReduceStore{

  constructor(props: StoreProps): void {
    super(Dispatcher);
    this.props = props;

    const { name, initialData, initialCreate = false } = this.props;
    initialCreate && Dispatcher.dispatch({ type: `${name}/create`, data: initialData });
  }

  getInitialState(): State {
    return Map({
      data: Map(),
      status: 0
    });
  }

  reduce(state: State, action: Action): State {
    const { name } = this.props;
    console.log('store reducer: ' + action.type);
    switch (action.type) {
      case `${name}/create`:{

        if ( this.props.storage ){
          StorageManager.create(name)
          .then( data => Dispatcher.dispatch({ type: `${name}/created`, data }) );
        }

        return state.set('data', action.data );
      }
			case `${name}/update`:{

        const data = state.get('data').merge(action.data);

        if ( this.props.storage ){
          StorageManager.update(name, data)
        }

        return state.set('data', data );
      }
      case `${name}/created`:
			case `${name}/updated`:{

        const data = state.get('data').merge(action.data);

        if ( this.props.storage ){
          StorageManager.update(name, data)
        }
        return state.set('data', data ).set('status', 1);
      }
      case `${name}/delete`:{

        if ( this.props.storage ){
          StorageManager.delete(name)
          .then( data => Dispatcher.dispatch({ type: `${name}/deleted`, data }) );
        }

        return  Map({
          data: Map(),
          status: 0
        });
      }
      case `${name}/deleted`:
      default:
        return state;
    }
  }
}

export default Store;
