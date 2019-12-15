import { ACTIVATE_ROUTE, DEACTIVATE_ROUTE, FINISH_ROUTE } from '../../actions';

const isFinished = (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_ROUTE:
      return false;
    case DEACTIVATE_ROUTE:
      return false;
    case FINISH_ROUTE:
      return true;
    default:
      return state;
  }
};

export default isFinished;
