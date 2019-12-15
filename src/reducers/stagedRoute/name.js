import { STAGE_ROUTE, UNSTAGE_ROUTE } from '../../actions';

const name = (state = null, action) => {
  switch (action.type) {
    case STAGE_ROUTE:
      return action.payload.name;
    case UNSTAGE_ROUTE:
      return null;
    default:
      return state;
  }
};

export default name;
