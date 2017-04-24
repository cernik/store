import { Dispatcher as FluxDispatcher } from 'flux';

class Dispatcher extends FluxDispatcher {
  dispatch(action = {}) {
    super.dispatch(action);
  }
}

export default new Dispatcher();
