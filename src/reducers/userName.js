import { loadCookie, USER_NAME_COOKIE } from '../utils/cookieHandler';
import { USER_LOGIN, USER_LOGOUT, SET_USER_NAME } from '../actions';

const initialState = loadCookie(USER_NAME_COOKIE) || '';

const userName = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload.userName;
    case SET_USER_NAME:
      return action.payload;
    case USER_LOGOUT:
      return '';
    default:
      return state;
  }
};

export default userName;
