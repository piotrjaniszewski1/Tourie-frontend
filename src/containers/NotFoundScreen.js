import React from 'react';
import ErrorScreen from '../components/ErrorScreen';
import CustomPropTypes from '../utils/CustomPropTypes';

const NotFoundScreen = ({ history }) => (
  <ErrorScreen
    title="404"
    subtitle="You were made for better sites"
    message="The page you are looking for is no longer here.
      Maybe it was never here in the first place.
      In any case, we are sorry."
    buttonText="Go home"
    onButtonClick={() => history.push('/')}
  />
);

NotFoundScreen.propTypes = {
  history: CustomPropTypes.history.isRequired,
};

export default NotFoundScreen;
