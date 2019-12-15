import { DEACTIVATE_ROUTE, ACTIVATE_ROUTE } from '../../actions';

const places = (state = [], action) => {
  switch (action.type) {
    case ACTIVATE_ROUTE:
      return action.payload.places;
    case DEACTIVATE_ROUTE:
      return [];
    default:
      return state;
  }
};

export default places;
