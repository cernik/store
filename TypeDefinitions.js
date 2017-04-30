// @flow
import { Map, Record, List } from 'immutable';

export type StoreStatusType =
  | ''
  | 'NONE'
  | 'CREATING'
  | 'LOADING'
  | 'UPDATING'
  | 'DELETING'
  ;

export type StateShape = {
  data: Map | List,
  status: StoreStatusType
}

export type State = Map<StateShape>;

type ActionType =
  | '/create'
  | '/created'
  | '/update'
  | '/updated'
  | '/delete'
  | '/deleted'
  ;

export type Action = {
  type: ActionType,
  data?: Object
};

export type StoreProps = {
  name: string,
  initialCreate: boolean,
  initialData: Object,
  storage?: boolean,
};
