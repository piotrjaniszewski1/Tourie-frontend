import { ACTIVATE_ROUTE, DEACTIVATE_ROUTE } from '../../actions';

const name = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_ROUTE:
      return action.payload.name;
    case DEACTIVATE_ROUTE:
      return null;
    default:
      return state;
  }
};

export default name;
