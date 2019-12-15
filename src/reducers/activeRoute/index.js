import { combineReducers } from 'redux';
import id from './id';
import places from './places';
import name from './name';
import current from './current';
import isFinished from './isFinished';
import startTime from './startTime';

export default combineReducers({
  id,
  name,
  places,
  current,
  isFinished,
  startTime,
});
