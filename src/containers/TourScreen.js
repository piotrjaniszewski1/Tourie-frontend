import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import withOfflineState from 'react-offline-hoc';
import CustomPropTypes from '../utils/CustomPropTypes';
import Layout from '../components/Layout';
import Title from '../components/Title';
import TourHeader from '../components/TourHeader';
import Navigation from './Navigation';
import ListModeTour from './ListModeTour';
import MapModeTour from './MapModeTour';
import FinishTourScreen from './FinishTourScreen';
import { LIST_MODE, MAP_MODE } from '../utils/tourModes';
import { deactivateRoute, setTourMode } from '../actions';

const mapStateToProps = state => ({
  isRouteFinished: state.activeRoute.isFinished,
  routePlaces: state.activeRoute.places,
  routeName: state.activeRoute.name,
  tourMode: state.tourMode,
});

const mapDispatchToProps = dispatch => ({
  onRouteClose: () => dispatch(deactivateRoute()),
  onModeChange: mode => dispatch(setTourMode(mode)),
});

const TourScreen = ({
  isRouteFinished, routePlaces, routeName, tourMode, onModeChange, onRouteClose, isOnline,
}) => {
  if (!routePlaces.length) {
    return (
      <Layout fitted light centered>
        <Title>Currently, you have no active routes</Title>
        <Navigation />
      </Layout>
    );
  }

  if (routePlaces && isRouteFinished) {
    return <FinishTourScreen />;
  }

  const modes = [LIST_MODE];
  if (isOnline) {
    modes.push(MAP_MODE);
  } else if (tourMode === MAP_MODE) {
    onModeChange(LIST_MODE);
  }

  return (
    <>
      <TourHeader
        name={routeName}
        modes={modes}
        activeMode={tourMode}
        onRouteClose={onRouteClose}
        onModeChange={onModeChange}
      />
      {tourMode === LIST_MODE && <ListModeTour />}
      {isOnline && <MapModeTour active={tourMode === MAP_MODE} />}
      <Navigation />
    </>
  );
};

TourScreen.defaultProps = {
  routeName: null,
  routePlaces: [],
};

TourScreen.propTypes = {
  routeName: PropTypes.string,
  routePlaces: CustomPropTypes.routePlaces,
  tourMode: CustomPropTypes.tourMode.isRequired,
  onRouteClose: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default withOfflineState(connect(mapStateToProps, mapDispatchToProps)(TourScreen));
