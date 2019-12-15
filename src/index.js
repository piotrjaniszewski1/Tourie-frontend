import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import store from './store/store';
import * as serviceWorker from './serviceWorkers/serviceWorker';

import PrivateRoute from './containers/PrivateRoute';
import AboutScreen from './containers/AboutScreen';
import LoginScreen from './containers/LoginScreen';
import SignUpScreen from './containers/SignUpScreen';
import HomeScreen from './containers/HomeScreen';
import NewRouteScreen from './containers/NewRouteScreen';
import SettingsScreen from './containers/SettingsScreen';
import UserEditScreen from './containers/UserEditScreen';
import RoutesScreen from './containers/RoutesScreen';
import TourScreen from './containers/TourScreen';
import NotFoundScreen from './containers/NotFoundScreen';
import UnauthorizedScreen from './containers/UnauthorizedScreen';
import EditRouteScreen from './containers/EditRouteScreen';

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/about" component={AboutScreen} />
            <Route path="/sign-up" component={SignUpScreen} />
            <Route path="/unauthorized" component={UnauthorizedScreen} />
            <PrivateRoute path="/home" component={HomeScreen} />
            <PrivateRoute exact path="/new-route" component={NewRouteScreen} />
            <PrivateRoute path="/new-route/customize" component={EditRouteScreen} />
            <PrivateRoute path="/tour" component={TourScreen} />
            <PrivateRoute path="/routes" component={RoutesScreen} />
            <PrivateRoute exact path="/settings" component={SettingsScreen} />
            <PrivateRoute path="/settings/user" component={UserEditScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
