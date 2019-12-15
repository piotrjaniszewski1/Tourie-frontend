import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import {
  GoogleMap, Marker, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import CustomPropTypes from '../utils/CustomPropTypes';
import pinIcon from '../assets/pin.svg';
import locateUser from '../assets/locate-user.svg';

const Container = styled.div`
  height: ${window.innerHeight}px;
  box-sizing: border-box;
  padding: 4rem 0 2rem;
`;

const Content = styled.div`
  height: 100%;
`;

const LocateUserButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.background.base};
  background-image: url(${locateUser});
  background-repeat: no-repeat;
  background-size: 1.5rem 1.5rem;
  background-position: center;
  height: 3rem;
  width: 3rem;
  z-index: ${({ theme }) => theme.layer.floating};
  position: fixed;
  top: 5rem;
  right: 1rem;
`;

class Map extends Component {
  static handleError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  constructor(props) {
    super(props);

    this.locateUser = this.locateUser.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
  }

  setCurrentPosition(position) {
    const { onLocationSet } = this.props;
    const { latitude, longitude } = position.coords;

    onLocationSet({
      lat: latitude,
      lng: longitude,
    });
  }

  locateUser() {
    navigator.geolocation.getCurrentPosition(this.setCurrentPosition, Map.handleError);
  }

  render() {
    const { location, center } = this.props;

    return (
      <>
        <LocateUserButton onClick={this.locateUser} />
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: 52.406, lng: 16.925 }}
          defaultOptions={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }}
          disableDefaultUI
          center={center}
        >
          <Marker
            position={location}
            icon={{
              url: pinIcon,
            }}
          />
        </GoogleMap>
      </>
    );
  }
}

Map.propTypes = {
  location: CustomPropTypes.location.isRequired,
  center: CustomPropTypes.location.isRequired,
  onLocationSet: PropTypes.func.isRequired,
};

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    containerElement: <Container />,
    loadingElement: <Content />,
    mapElement: <Content />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map);
