import { arrayMove } from 'react-sortable-hoc';
import {
  STAGE_ROUTE,
  UNSTAGE_ROUTE,
  REMOVE_FROM_STAGED_ROUTE,
  MOVE_ITEM_IN_STAGED_ROUTE,
} from '../../actions';

const places = (state = null, action) => {
  let newState;

  switch (action.type) {
    case STAGE_ROUTE:
      return action.payload.places;
    case REMOVE_FROM_STAGED_ROUTE:
      newState = [...state];
      newState.splice(action.payload.index, 1);
      return newState;
    case MOVE_ITEM_IN_STAGED_ROUTE:
      return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
    case UNSTAGE_ROUTE:
      return null;
    default:
      return state;
  }
};

export default places;
