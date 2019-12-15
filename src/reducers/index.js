import { combineReducers } from 'redux';
import isAuthenticated from './isAuthenticated';
import userName from './userName';
import userEmail from './userEmail';
import activeRoute from './activeRoute';
import tourMode from './tourMode';
import stagedRoute from './stagedRoute';
import userLocation from './userLocation';

import { USER_LOGOUT } from '../actions';

const appReducer = combineReducers({
  isAuthenticated,
  userName,
  userEmail,
  activeRoute,
  tourMode,
  stagedRoute,
  userLocation,
});

export default (state, action) => {
  let nextState = state;

  if (action.type === USER_LOGOUT) {
    nextState = undefined;
  }

  return appReducer(nextState, action);
};
