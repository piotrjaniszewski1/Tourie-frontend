import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CustomPropTypes from '../utils/CustomPropTypes';
import mapEventToState from '../utils/mapEventToState';
import { request } from '../utils/request';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import { userLogin } from '../actions/index';
import LabelLink from '../components/LabelLink';
import Logo from '../components/Logo';
import {
  saveCookie, USER_NAME_COOKIE, USER_EMAIL_COOKIE, TOKEN_COOKIE,
} from '../utils/cookieHandler';

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (userName, userEmail) => dispatch(userLogin(userName, userEmail)),
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };

    this.handleChange = mapEventToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(onEnd) {
    const { email, password } = this.state;
    const { onLogin, history } = this.props;

    try {
      const { token, userName, userEmail } = await request('auth/login', {
        method: 'POST',
        body: { email, password },
      });

      saveCookie(TOKEN_COOKIE, token);
      saveCookie(USER_NAME_COOKIE, userName);
      saveCookie(USER_EMAIL_COOKIE, userEmail);
      onLogin(userName, userEmail);
      history.push('/home');
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        errorMessage: 'Failed to login.',
      });
    } finally {
      onEnd();
    }
  }

  render() {
    const {
      email, password, errorMessage,
    } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <Layout distributed spanned narrow>
        {isAuthenticated && <Redirect to="/home" />}
        <LabelLink
          as={Link}
          to="/sign-up"
          aria-label="Sign up"
          block
          right
        >
          Sign up
        </LabelLink>
        <Logo welcome subtitle="Let me guide you." />
        <Form
          requiresOnline
          expand
          onSubmit={this.handleSubmit}
          elements={(
            <>
              <Input
                required
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={email}
              />
              <Input
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
              />
            </>
          )}
          buttons={[
            <Button
              as="input"
              type="submit"
              value="Login"
              primary
            />,
          ]}
          errorMessage={errorMessage}
        />
      </Layout>
    );
  }
}

LoginScreen.propTypes = {
  history: CustomPropTypes.history.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
