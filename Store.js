// @flow
import keyMirror from 'keymirror';
import { Map, Record, List } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import StoreStatusTypes from './StoreStatusTypes';
import StorageManager from './StorageManager';
import type { State, Action, StoreProps } from './TypeDefinitions';

export default class Store extends ReduceStore {

  constructor(props: StoreProps): void {
    super(Dispatcher);
    this.props = props;

    const { name, initialData, initialCreate = false } = this.props;
    initialCreate && Dispatcher.dispatch({ type: `${name}/create`, data: initialData });
  }

  getInitialState(): State {
    return Map({
      data: Map(),
      status: ''
    });
  }

  reduce(state: State, action: Action): State {
    const { name } = this.props;

    switch (action.type) {
      case `${name}/create`:{

        const data = action.data;

        if ( this.props.storage ){
          StorageManager.create(name).then( data => Dispatcher.dispatch({ type: `${name}/created`, data }) );
        }

        return state.set( 'data', data ).set( 'status', StoreStatusTypes.CREATING );
      }
			case `${name}/update`:{

        const data = state.get('data').merge(action.data);

        if ( this.props.storage ){
          StorageManager.update(name, data)
        }

        return state.set('data', data ).set( 'status', StoreStatusTypes.UPDATING );
      }
      case `${name}/created`:
			case `${name}/updated`:{

        const data = state.get('data').merge(action.data);

        if ( this.props.storage ){
          StorageManager.update(name, data)
        }
        return state.set('data', data ).set( 'status', StoreStatusTypes.NONE );
      }
      case `${name}/delete`:{

        const data = new Map();

        if ( this.props.storage ){
          StorageManager.delete(name).then( data => Dispatcher.dispatch({ type: `${name}/deleted`, data }) );
        }

        return state.set( 'data', data ).set( 'status', StoreStatusTypes.DELETING );
      }
      case `${name}/deleted`:
        return state.set( 'status', StoreStatusTypes.NONE );
      default:
        return state;
    }
  }
}
