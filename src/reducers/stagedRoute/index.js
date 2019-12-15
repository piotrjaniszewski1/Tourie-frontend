import { combineReducers } from 'redux';
import places from './places';
import name from './name';

export default combineReducers({
  name,
  places,
});
