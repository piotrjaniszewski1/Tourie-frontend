import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomPropTypes from '../utils/CustomPropTypes';
import TourNavigation from './TourNavigation';
import VisibleContainer from '../components/VisibleContainer';
import Map from '../components/Map';
import { setUserLocation } from '../actions';

const mapStateToProps = state => ({
  currentPlaceLocation: state.activeRoute.places[state.activeRoute.current].location,
  userLocation: state.userLocation,
});

const mapDispatchToProps = dispatch => ({
  onLocationSet: index => dispatch(setUserLocation(index)),
});

const MapModeTour = ({
  userLocation, currentPlaceLocation, onLocationSet, active,
}) => (
  <VisibleContainer visible={active}>
    <Map
      location={currentPlaceLocation}
      center={userLocation || currentPlaceLocation}
      onLocationSet={onLocationSet}
    />
    <TourNavigation />
  </VisibleContainer>
);

MapModeTour.defaultProps = {
  active: true,
};

MapModeTour.propTypes = {
  currentPlaceLocation: CustomPropTypes.location.isRequired,
  userLocation: CustomPropTypes.location.isRequired,
  onLocationSet: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapModeTour);
