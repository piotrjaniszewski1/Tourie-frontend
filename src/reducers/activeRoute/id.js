import { ACTIVATE_ROUTE, DEACTIVATE_ROUTE } from '../../actions';

const id = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_ROUTE:
      return action.payload.id;
    case DEACTIVATE_ROUTE:
      return null;
    default:
      return state;
  }
};

export default id;
