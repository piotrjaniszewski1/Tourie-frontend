import { createAction, createSimpleAction } from './actionCreator';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';

export const ACTIVATE_ROUTE = 'ACTIVATE_ROUTE';
export const DEACTIVATE_ROUTE = 'DEACTIVATE_ROUTE';
export const SET_TOUR_MODE = 'SET_TOUR_MODE';

export const GO_TO_NEXT_PLACE = 'GO_TO_NEXT_PLACE';
export const GO_TO_PREV_PLACE = 'GO_TO_PREV_PLACE';
export const FINISH_ROUTE = 'FINISH_ROUTE';

export const STAGE_ROUTE = 'STAGE_ROUTE';
export const UNSTAGE_ROUTE = 'UNSTAGE_ROUTE';
export const REMOVE_FROM_STAGED_ROUTE = 'REMOVE_FROM_STAGED_ROUTE';
export const MOVE_ITEM_IN_STAGED_ROUTE = 'MOVE_ITEM_IN_STAGED_ROUTE';

export const userLogin = (userName, userEmail) => createAction(USER_LOGIN, { userName, userEmail });
export const userLogout = () => createSimpleAction(USER_LOGOUT);

export const setUserName = userName => createAction(SET_USER_NAME, userName);
export const setUserEmail = userEmail => createAction(SET_USER_EMAIL, userEmail);
export const setUserLocation = location => createAction(SET_USER_LOCATION, location);

export const activateRoute = (id, name, places) => (
  createAction(ACTIVATE_ROUTE, {
    id, name, places, startTime: new Date(),
  })
);
export const deactivateRoute = () => createSimpleAction(DEACTIVATE_ROUTE);
export const setTourMode = mode => createAction(SET_TOUR_MODE, mode);

export const goToNextPlace = () => createSimpleAction(GO_TO_NEXT_PLACE);
export const goToPrevPlace = () => createSimpleAction(GO_TO_PREV_PLACE);
export const finishRoute = () => createSimpleAction(FINISH_ROUTE);

export const stageRoute = (name, places) => createAction(STAGE_ROUTE, { name, places });
export const unstageRoute = () => createSimpleAction(UNSTAGE_ROUTE);
export const removeFromStagedRoute = index => createAction(REMOVE_FROM_STAGED_ROUTE, { index });
export const moveItemInStagedRoute = (oldIndex, newIndex) => (
  createAction(MOVE_ITEM_IN_STAGED_ROUTE, { oldIndex, newIndex })
);
