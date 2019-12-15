import { loadCookie, TOKEN_COOKIE } from '../utils/cookieHandler';
import { USER_LOGIN, USER_LOGOUT } from '../actions';

const initialState = loadCookie(TOKEN_COOKIE) !== undefined;

const isAuthenticated = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return true;
    case USER_LOGOUT:
      return false;
    default:
      return state;
  }
};

export default isAuthenticated;
