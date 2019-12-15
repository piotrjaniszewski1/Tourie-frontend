import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { authorizedRequest } from '../utils/request';
import mapEventToState from '../utils/mapEventToState';
import filterAttributesIfMatch from '../utils/filterAttributesIfMatch';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import Section from '../components/Section';
import { setUserName, setUserEmail } from '../actions/index';
import {
  saveCookie, USER_NAME_COOKIE, USER_EMAIL_COOKIE,
} from '../utils/cookieHandler';

const mapStateToProps = state => ({
  userName: state.userName,
  userEmail: state.userEmail,
});

const mapDispatchToProps = dispatch => ({
  onSetUserName: userName => dispatch(setUserName(userName)),
  onSetUserEmail: userEmail => dispatch(setUserEmail(userEmail)),
});

class UserEditScreen extends Component {
  constructor(props) {
    super(props);

    const { userName, userEmail } = this.props;

    this.state = {
      name: userName,
      email: userEmail,
      password: '',
      passwordRepeat: '',
      currentPassword: '',
      errorMessage: null,
      successMessage: null,
    };

    this.handleChange = mapEventToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(onEnd) {
    const {
      name, email, password, passwordRepeat, currentPassword,
    } = this.state;
    const {
      userName: initialName,
      userEmail: initialEmail,
      onSetUserName,
      onSetUserEmail,
    } = this.props;

    if (password !== passwordRepeat) {
      this.setState({
        errorMessage: 'Passwords do not match.',
      }, onEnd);
      return;
    }

    try {
      const { name: newName, email: newEmail } = await authorizedRequest('users/me', {
        method: 'PATCH',
        body: {
          ...filterAttributesIfMatch({
            name, email, password,
          }, {
            name: initialName,
            email: initialEmail,
            password: '',
          }),
          currentPassword,
        },
      });

      saveCookie(USER_NAME_COOKIE, newName);
      saveCookie(USER_EMAIL_COOKIE, newEmail);
      onSetUserName(newName);
      onSetUserEmail(newEmail);

      this.setState({
        password: '',
        passwordRepeat: '',
        currentPassword: '',
        successMessage: 'Successfully changed!',
      });
    } catch (error) {
      const errorMessage = error.message;

      this.setState({
        name: initialName,
        email: initialEmail,
        password: '',
        passwordRepeat: '',
        currentPassword: '',
        successMessage: '',
        errorMessage,
      });
    } finally {
      onEnd();
    }
  }

  render() {
    const {
      name,
      email,
      currentPassword,
      password,
      passwordRepeat,
      errorMessage,
      successMessage,
    } = this.state;
    const { history } = this.props;

    return (
      <Layout narrow>
        <BackButton history={history} />
        <Title>User account</Title>
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
                type="password"
                name="password"
                placeholder="New password"
                onChange={this.handleChange}
                value={password}
              />
              <Input
                type="password"
                name="passwordRepeat"
                placeholder="Repeat new password"
                onChange={this.handleChange}
                value={passwordRepeat}
              />
              <Section>
                <h2>Confirm changes</h2>
                <Input
                  required
                  type="password"
                  name="currentPassword"
                  placeholder="Current password"
                  onChange={this.handleChange}
                  value={currentPassword}
                />
              </Section>
            </>
          )}
          errorMessage={errorMessage}
          successMessage={successMessage}
          buttons={[
            <Button
              as="input"
              type="submit"
              value="Save"
              primary
            />,
          ]}
        />
      </Layout>
    );
  }
}

UserEditScreen.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditScreen);
