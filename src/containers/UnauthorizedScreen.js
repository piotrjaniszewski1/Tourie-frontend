import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorScreen from '../components/ErrorScreen';
import { removeCookie, USER_NAME_COOKIE, TOKEN_COOKIE } from '../utils/cookieHandler';
import CustomPropTypes from '../utils/CustomPropTypes';
import { userLogout } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(userLogout()),
});

class UnauthorizedScreen extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    removeCookie(USER_NAME_COOKIE);
    removeCookie(TOKEN_COOKIE);
    onLogout();
  }

  render() {
    const { history } = this.props;
    return (
      <ErrorScreen
        title="Ooops!"
        subtitle="You are not allowed here."
        message="Currently, you don&rsquo;t have permission to enter desired site.
          It seems like your login credentials have expired.
          Please, try to relogin."
        buttonText="Login page"
        onButtonClick={() => history.push('/')}
      />
    );
  }
}

UnauthorizedScreen.propTypes = {
  onLogout: PropTypes.func.isRequired,
  history: CustomPropTypes.history.isRequired,
};

export default connect(null, mapDispatchToProps)(UnauthorizedScreen);
