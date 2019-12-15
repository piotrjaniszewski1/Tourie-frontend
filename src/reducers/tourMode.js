import { SET_TOUR_MODE, DEACTIVATE_ROUTE } from '../actions';
import { LIST_MODE } from '../utils/tourModes';

const tourMode = (state = LIST_MODE, action) => {
  switch (action.type) {
    case SET_TOUR_MODE:
      return action.payload;
    case DEACTIVATE_ROUTE:
      return LIST_MODE;
    default:
      return state;
  }
};

export default tourMode;
