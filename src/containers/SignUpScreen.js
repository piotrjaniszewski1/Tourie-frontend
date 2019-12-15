import { connect } from 'react-redux';
import React, { Component } from 'react';
import mapEventToState from '../utils/mapEventToState';
import CustomPropTypes from '../utils/CustomPropTypes';
import { request } from '../utils/request';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import { userLogin } from '../actions/index';
import {
  saveCookie, USER_NAME_COOKIE, USER_EMAIL_COOKIE, TOKEN_COOKIE,
} from '../utils/cookieHandler';

const mapDispatchToProps = dispatch => ({
  onLogin: (userName, userEmail) => dispatch(userLogin(userName, userEmail)),
});

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      errorMessage: null,
    };

    this.handleChange = mapEventToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(onEnd) {
    const {
      name, email, password, passwordRepeat,
    } = this.state;
    const { history, onLogin } = this.props;

    if (password !== passwordRepeat) {
      this.setState({
        errorMessage: 'Passwords do not match.',
      }, onEnd);
      return;
    }

    try {
      const { token, userName, userEmail } = await request('users', {
        method: 'POST',
        body: { email, name, password },
      });

      saveCookie(TOKEN_COOKIE, token);
      saveCookie(USER_NAME_COOKIE, userName);
      saveCookie(USER_EMAIL_COOKIE, userEmail);
      onLogin(userName, userEmail);
      history.push('/home');
    } catch (error) {
      const errorMessage = error.message;

      this.setState({
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        errorMessage,
      });
    } finally {
      onEnd();
    }
  }

  render() {
    const {
      name, email, password, passwordRepeat, errorMessage,
    } = this.state;
    const { history } = this.props;

    return (
      <Layout narrow>
        <BackButton history={history} />
        <Title>Create account</Title>
        <Form
          requiresOnline
          onSubmit={this.handleSubmit}
          elements={(
            <>
              <Input
                required
                type="text"
                name="name"
                placeholder="Your name"
                onChange={this.handleChange}
                value={name}
              />
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
              <Input
                required
                type="password"
                name="passwordRepeat"
                placeholder="Repeat password"
                onChange={this.handleChange}
                value={passwordRepeat}
              />
            </>
          )}
          errorMessage={errorMessage}
          buttons={[
            <Button
              as="input"
              type="submit"
              value="Create account"
              primary
            />,
          ]}
        />
      </Layout>
    );
  }
}

SignUpScreen.propTypes = {
  history: CustomPropTypes.history.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUpScreen);
