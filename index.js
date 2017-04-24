
// module.exports.Store = require('./src/Store');
// @flow
import React from 'react'
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
// import Dispatcher from './src/Dispatcher';
import { Dispatcher as FluxDispatcher } from 'flux';

class _Dispatcher extends FluxDispatcher {
  dispatch(action = {}) {
    super.dispatch(action);
  }
}
const Dispatcher = new _Dispatcher();

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
    console.log('flux-store action: ');
    console.log(action);
    // console.log('flux-store props: ');
    // console.log(this.props);
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
export { Dispatcher, Store };
