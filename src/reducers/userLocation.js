import {
  SET_USER_LOCATION, ACTIVATE_ROUTE, GO_TO_NEXT_PLACE, GO_TO_PREV_PLACE,
} from '../actions';

const userLocation = (state = null, action) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return action.payload;
    case ACTIVATE_ROUTE:
    case GO_TO_NEXT_PLACE:
    case GO_TO_PREV_PLACE:
      return null;
    default:
      return state;
  }
};

export default userLocation;
