import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingState from './LoadingState';
import { sendRequest, buildRequest, buildAuthorizedRequest, handleResponse } from '../utils/request';
import ErrorScreen from './ErrorScreen';
import UnauthorizedScreen from '../containers/UnauthorizedScreen';

const cacheRequest = async (request) => {
  const cachedResult = await caches.match(request);
  if (cachedResult) {
    return handleResponse(cachedResult);
  }
  throw new Error('not found in cache');
};

class Request extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      response: null,
      loadedFromNetwork: false,
    };

    this.performRequest = this.performRequest.bind(this);
  }

  componentDidMount() {
    this.performRequest();
  }

  performRequest() {
    this.setState({
      error: null,
      response: null,
    });
    const {
      path, method, body, anonymous, cacheFirst,
    } = this.props;
    const requestFactory = anonymous ? buildRequest : buildAuthorizedRequest;
    const request = requestFactory(path, { method, body });

    if (cacheFirst) {
      this.processResponse(cacheRequest(request), true).catch(() => {});
    }
    this.processResponse(sendRequest(request)).catch((error) => {
      const { response, loadedFromNetwork } = this.state;
      if (response && !loadedFromNetwork) {
        this.setState({ response: null, error });
      }
    });
  }

  processResponse(request, isCached = false) {
    return request.then((response) => {
      const { loadedFromNetwork } = this.state;
      if (isCached && loadedFromNetwork) {
        return;
      }
      this.setState({ response, error: null, loadedFromNetwork: !isCached });
    });
  }

  render() {
    const { error, response } = this.state;
    const { render, inner } = this.props;
    if (response) {
      return render(response);
    }
    if (error) {
      if (error.message === 'Failed to fetch') {
        return (
          <ErrorScreen
            inner={inner}
            title="Oh no!"
            subtitle="Connection problem"
            message="We're having trouble connecting to the server.
              Please make sure that you're online and try again."
            buttonText="Try again"
            onButtonClick={this.performRequest}
          />
        );
      }
      if (error.response.status === 401) {
        return <UnauthorizedScreen />;
      }
      return (
        <ErrorScreen
          inner={inner}
          title="Oh no!"
          subtitle={error.message}
          message={(
            <>
              There was a problem with processing your action.
              Please try again or, if the problem persists, <Link to="/">go back home</Link>.
            </>
          )}
          buttonText="Try again"
          onButtonClick={this.performRequest}
        />
      );
    }
    return <LoadingState inner={inner} />;
  }
}

Request.defaultProps = {
  method: 'GET',
  body: undefined,
  anonymous: false,
  inner: false,
  cacheFirst: false,
};

Request.propTypes = {
  inner: PropTypes.bool,
  path: PropTypes.string.isRequired,
  method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  body: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  anonymous: PropTypes.bool,
  render: PropTypes.func.isRequired,
  cacheFirst: PropTypes.bool,
};

export default Request;
