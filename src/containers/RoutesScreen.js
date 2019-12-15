import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import Request from '../components/Request';
import Layout from '../components/Layout';
import Title from '../components/Title';
import RoutePreview from '../components/RoutePreview';
import EmptyState from '../components/EmptyState';
import FloatingActionButton from '../components/FloatingActionButton';
import Navigation from './Navigation';
import Section from '../components/Section';
import SeamlessButton from '../components/SeamlessButton';
import { activateRoute } from '../actions/index';
import createPhotoURL from '../utils/createPhotoURL';
import { authorizedRequest } from '../utils/request';

const RoutesList = ({ title, routes, onClick }) => (
  <Section>
    <Title>{title}</Title>
    {routes.map(({
      id, name, placesCount, lastFinishedAt, sharedBy, photoReference,
    }) => (
      <SeamlessButton onClick={() => onClick(id)} key={id}>
        <RoutePreview
          key={id}
          name={name}
          placesCount={placesCount}
          lastFinishedAt={lastFinishedAt}
          sharedBy={sharedBy}
          photo={createPhotoURL(photoReference)}
        />
      </SeamlessButton>
    ))}
  </Section>
);

RoutesList.defaultProps = {
  onClick: () => {},
};

RoutesList.propTypes = {
  title: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    CustomPropTypes.route,
  ).isRequired,
  onClick: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onRouteSelect: (id, name, places) => dispatch(activateRoute(id, name, places)),
});

class RoutesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteClick = this.handleRouteClick.bind(this);
  }

  async handleRouteClick(id) {
    const { onRouteSelect, history } = this.props;
    const route = await authorizedRequest(`routes/${id}`);

    route.places.forEach((place) => {
      place.photo = createPhotoURL(place.photoReference);
    });

    onRouteSelect(id, route.name, route.places);
    history.push('/tour');
  }

  render() {
    return (
      <>
        <Request
          path="routes"
          cacheFirst
          render={({ saved, shared }) => ((saved.length + shared.length) > 0 ? (
            <Layout spanned light elongated>
              {saved.length > 0 && <RoutesList title="Your routes" routes={saved} onClick={this.handleRouteClick} />}
              {shared.length > 0 && <RoutesList title="Shared with you" routes={shared} onClick={this.handleRouteClick} />}
            </Layout>
          ) : (
            <EmptyState
              heading="You don't have any saved routes"
              message="Why don't you create a new one now?"
            />
          ))}
        />
        <FloatingActionButton to="/new-route" name="New route" />
        <Navigation />
      </>
    );
  }
}

RoutesScreen.propTypes = {
  onRouteSelect: PropTypes.func.isRequired,
  history: CustomPropTypes.history.isRequired,
};

export default connect(null, mapDispatchToProps)(RoutesScreen);
