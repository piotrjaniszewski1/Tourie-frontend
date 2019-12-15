import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Navigation from '../components/Navigation';
import HomeIcon from '../components/icons/HomeIcon';
import TourIcon from '../components/icons/TourIcon';
import RoutesIcon from '../components/icons/RoutesIcon';
import SettingsIcon from '../components/icons/SettingsIcon';

const NavigationContainer = ({ location }) => {
  const { pathname } = location;

  const elements = [
    {
      path: '/home',
      name: 'Home',
      icon: HomeIcon,
    },
    {
      path: '/tour',
      name: 'Tour',
      icon: TourIcon,
    },
    {
      path: '/routes',
      name: 'Routes',
      icon: RoutesIcon,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: SettingsIcon,
    },
  ];

  elements.forEach((element) => {
    element.active = element.path === pathname;
  });

  return (
    <Navigation elements={elements} />
  );
};

NavigationContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(NavigationContainer);
