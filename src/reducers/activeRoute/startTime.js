import { DEACTIVATE_ROUTE, ACTIVATE_ROUTE } from '../../actions';

const startTime = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_ROUTE:
      return action.payload.startTime;
    case DEACTIVATE_ROUTE:
      return null;
    default:
      return state;
  }
};

export default startTime;
