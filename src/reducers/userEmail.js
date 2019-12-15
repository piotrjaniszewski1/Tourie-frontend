import { loadCookie, USER_EMAIL_COOKIE } from '../utils/cookieHandler';
import { USER_LOGIN, USER_LOGOUT, SET_USER_EMAIL } from '../actions';

const initialState = loadCookie(USER_EMAIL_COOKIE) || '';

const userEmail = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload.userEmail;
    case SET_USER_EMAIL:
      return action.payload;
    case USER_LOGOUT:
      return '';
    default:
      return state;
  }
};

export default userEmail;
