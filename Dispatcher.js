// @flow

import { Dispatcher as FluxDispatcher } from 'flux';

type Action = {
  type: string;
  data?: Object
}

class Dispatcher extends FluxDispatcher {
  dispatch(action: Action) {
    super.dispatch(action);
  }
}

export default new Dispatcher();
