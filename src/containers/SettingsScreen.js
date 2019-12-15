import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Navigation from './Navigation';
import Title from '../components/Title';
import Section from '../components/Section';
import Form from '../components/Form';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ActionableTitleBox from '../components/ActionableTitleBox';
import OptionList from '../components/OptionList';
import { userLogout } from '../actions/index';
import {
  removeCookie, USER_NAME_COOKIE, USER_EMAIL_COOKIE, TOKEN_COOKIE,
} from '../utils/cookieHandler';
import { authorizedRequest } from '../utils/request';

const mapStateToProps = state => ({
  userName: state.userName,
  userEmail: state.userEmail,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(userLogout()),
});

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      errorMessage: null,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleAccountDelete = this.handleAccountDelete.bind(this);
  }

  handleLogout() {
    const { onLogout, history } = this.props;

    removeCookie(TOKEN_COOKIE);
    removeCookie(USER_NAME_COOKIE);
    removeCookie(USER_EMAIL_COOKIE);
    onLogout();
    history.push('/');
  }

  async handleAccountDelete(onEnd) {
    try {
      await authorizedRequest('users/me', {
        method: 'DELETE',
      });

      this.handleLogout();
    } catch (error) {
      const errorMessage = error.message;
      this.setState({
        errorMessage,
      });
    } finally {
      onEnd();
    }
  }

  render() {
    const { userName, userEmail } = this.props;
    const { isModalVisible, errorMessage } = this.state;

    return (
      <Layout spanned light elongated>
        <Navigation />
        <Title>Settings</Title>
        <Section>
          <h2>User account</h2>
          <Link to="/settings/user">
            <ActionableTitleBox
              title={userName}
              subtitle={userEmail}
              actionName="Edit user"
            />
          </Link>
        </Section>
        <Section>
          <h2>General</h2>
          <OptionList>
            <Link to="/about">
              About the application
            </Link>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </OptionList>
        </Section>
        <Section>
          <h2>Danger zone</h2>
          <OptionList>
            <button type="button" onClick={() => this.setState({ isModalVisible: true })}>Delete account</button>
          </OptionList>
        </Section>
        {
          isModalVisible
          && (
            <Modal
              onClose={() => this.setState({ isModalVisible: false })}
            >
              <Title>Delete account</Title>
              <p>
                Are you sure that you want to delete account? This oparation is irreversible
                and you will lose all data associated with this account.
              </p>
              <Form
                onSubmit={this.handleAccountDelete}
                errorMessage={errorMessage}
                buttons={[
                  <Button
                    as="input"
                    type="submit"
                    value="Delete account"
                    primary
                    danger
                  />,
                ]}
              />
            </Modal>
          )
        }
      </Layout>
    );
  }
}

SettingsScreen.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
