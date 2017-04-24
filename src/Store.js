// @flow
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';

class Store extends ReduceStore{
  constructor(props) {
    super(Dispatcher);
    this.props = props;
    const { type, value } = this.props;

    Dispatcher.dispatch({type: `${type}/create`, value});
  }

  getInitialState() {
    return Immutable.Map();
  }

  reduce(state, action) {
    const { type, save } = this.props;
    
    switch (action.type) {
      case `${type}/create`:{
        return state.set('value',action.value);
        break;
      }
      case `${type}/created`:
      case `${type}/update`:{
        return state.update('value', value => value.merge(action.value));
        break;
      }
      case `${type}/updated`:
      default:
        return state;
        break;
    }
  }
}

export default Store;
