import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import MapTourNavigation from '../components/MapTourNavigation';
import ListTourNavigation from '../components/ListTourNavigation';
import NavigationButton from '../components/NavigationButton';
import { goToNextPlace, goToPrevPlace, finishRoute } from '../actions';
import { MAP_MODE } from '../utils/tourModes';

const mapStateToProps = state => ({
  tourMode: state.tourMode,
  currentPlaceIndex: state.activeRoute.current,
  routePlaces: state.activeRoute.places,
});

const mapDispatchToProps = dispatch => ({
  goToNext: () => dispatch(goToNextPlace()),
  goToPrev: () => dispatch(goToPrevPlace()),
  finish: () => dispatch(finishRoute()),
});

const TourNavigation = ({
  tourMode, currentPlaceIndex, routePlaces, goToNext, goToPrev, finish,
}) => {
  const {
    name, address, photo, website,
  } = routePlaces[currentPlaceIndex];
  const isFirstPlace = currentPlaceIndex === 0;
  const isLastPlace = currentPlaceIndex === routePlaces.length - 1;
  const TourNavigationComponent = tourMode === MAP_MODE ? MapTourNavigation : ListTourNavigation;

  return (
    <TourNavigationComponent
      name={name}
      address={address}
      photo={photo}
      website={website}
      nextComponent={(
        <NavigationButton
          next
          onClick={isLastPlace ? finish : goToNext}
        />
      )}
      prevComponent={(
        <NavigationButton
          prev
          blocked={isFirstPlace}
          onClick={!isFirstPlace && goToPrev}
        />
      )}
    />
  );
};

TourNavigation.propTypes = {
  tourMode: CustomPropTypes.tourMode.isRequired,
  currentPlaceIndex: PropTypes.number.isRequired,
  routePlaces: CustomPropTypes.routePlaces.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TourNavigation);
