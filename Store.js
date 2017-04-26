// @flow
import { Map, Record } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';

type State = Map | Record;

type Action = {
  type: string,
  data?: Object
};

type Props = {
  type: string,
  value: Object
};

class Store extends ReduceStore{

  constructor(props: Props):void {
    super(Dispatcher);
    this.props = props;

    const { type, value } = this.props;
    Dispatcher.dispatch({type: `${type}/create`, data: value});
  }

  getInitialState(): State {
    return Map();
  }

  reduce(state: State, action: Action): State {
    const { type } = this.props;

    switch (action.type) {
      case `${type}/create`:{
        return state.set('value',action.data);
      }
      case `${type}/created`:
			case `${type}/update`:
			case `${type}/updated`:{
        return state.update('value', value => value.merge(action.data));
      }
      case `${type}/delete`:
      default:
        return state;
    }
  }
}

export default Store;
