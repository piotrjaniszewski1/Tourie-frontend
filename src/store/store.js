import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import throttle from 'lodash/throttle';
import { saveState, loadState } from '../utils/localStorageHandler';
import reducers from '../reducers';

// eslint-disable-next-line
const DEBUG_SETTINGS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = loadState();

const createStoreWithMiddleware = applyMiddleware(promise())(createStore);
const store = createStoreWithMiddleware(reducers, initialState, DEBUG_SETTINGS);

store.subscribe(throttle(() => {
  const {
    activeRoute,
  } = store.getState();

  saveState({
    activeRoute,
  });
}, 1000));

export default store;
