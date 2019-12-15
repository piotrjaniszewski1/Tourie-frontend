import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import Layout from '../components/Layout';
import TourNavigation from './TourNavigation';
import PlacePreview from '../components/PlacePreview';

const mapStateToProps = state => ({
  routePlaces: state.activeRoute.places,
  currentPlaceIndex: state.activeRoute.current,
});

const ListModeTour = ({ routePlaces, currentPlaceIndex }) => (
  <Layout narrow spanned elongated light pushed>
    <TourNavigation />
    {
      routePlaces
        .slice(currentPlaceIndex + 1)
        .map((place, index) => (
          <PlacePreview key={place.id} {...place} position={currentPlaceIndex + index + 2} />
        ))
    }
  </Layout>
);

ListModeTour.propTypes = {
  currentPlaceIndex: PropTypes.number.isRequired,
  routePlaces: CustomPropTypes.routePlaces.isRequired,
};

export default connect(mapStateToProps)(ListModeTour);
