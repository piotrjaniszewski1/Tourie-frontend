import {
  GO_TO_NEXT_PLACE, GO_TO_PREV_PLACE, ACTIVATE_ROUTE, DEACTIVATE_ROUTE,
} from '../../actions';

const current = (state = 0, action) => {
  switch (action.type) {
    case GO_TO_NEXT_PLACE:
      return state + 1;
    case GO_TO_PREV_PLACE:
      return state - 1;
    case ACTIVATE_ROUTE:
    case DEACTIVATE_ROUTE:
      return 0;
    default:
      return state;
  }
};

export default current;
