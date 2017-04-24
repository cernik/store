import { Dispatcher } from 'flux';

class _Dispatcher extends Dispatcher {
  dispatch(action = {}) {
    super.dispatch(action);
  }
}

export default new _Dispatcher();
