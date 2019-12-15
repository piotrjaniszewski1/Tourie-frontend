import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import { authorizedRequest } from '../utils/request';
import {
  userLogout, goToNextPlace, goToPrevPlace, finishRoute,
} from '../actions';
import {
  removeCookie, USER_NAME_COOKIE, USER_EMAIL_COOKIE, TOKEN_COOKIE,
} from '../utils/cookieHandler';

const mapStateToProps = state => ({
  userName: state.userName,
  currentPlaceIndex: state.activeRoute.current,
  routePlaces: state.activeRoute.places,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(userLogout()),
  goToNext: () => dispatch(goToNextPlace()),
  goToPrev: () => dispatch(goToPrevPlace()),
  finish: () => dispatch(finishRoute()),
});

class RemoteActionHandler extends Component {
  constructor(props) {
    super(props);

    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidUpdate() {
    const { query } = this.props;
    this.handleQuery(query);
  }

  async handleQuery(query) {
    if (query.length === 0) {
      return;
    }

    try {
      const { intent } = await authorizedRequest(`wit?message=${
        encodeURIComponent(query.toLowerCase())
      }`, {
        method: 'GET',
      });

      this.handleAction(intent);
    } catch (error) {
      console.warn(error);
    }
  }

  handleAction(intent) {
    const {
      onLogout, history, currentPlaceIndex, routePlaces, goToNext, goToPrev, finish,
    } = this.props;

    const isFirstPlace = currentPlaceIndex === 0;
    const isLastPlace = currentPlaceIndex === routePlaces.length - 1;

    switch (intent) {
      case 'settings_screen':
        history.push('/settings');
        break;
      case 'home_screen':
        history.push('/home');
        break;
      case 'routes_screen':
        history.push('/routes');
        break;
      case 'tour_screen':
        history.push('/tour');
        break;
      case 'generate_route':
        history.push('/new-route');
        break;
      case 'logout':
        removeCookie(TOKEN_COOKIE);
        removeCookie(USER_NAME_COOKIE);
        removeCookie(USER_EMAIL_COOKIE);
        onLogout();
        history.push('/');
        break;
      case 'next_place':
        if (isLastPlace) finish();
        else goToNext();
        break;
      case 'previous_place':
        if (!isFirstPlace) goToPrev();
        break;
      default:
        break;
    }
  }

  render() {
    return null;
  }
}

RemoteActionHandler.defaultProps = {
  query: '',
};

RemoteActionHandler.propTypes = {
  history: CustomPropTypes.history.isRequired,
  query: PropTypes.string,
  currentPlaceIndex: PropTypes.number.isRequired,
  routePlaces: CustomPropTypes.routePlaces.isRequired,
  onLogout: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RemoteActionHandler));
