import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: ${({ theme }) => theme.color.background.base};
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: ${({ theme }) => theme.layer.navigation};
`;

const NavLink = styled.a`
  flex: 1;
  padding: 1.2rem 0;
  text-align: center;
`;

const Navigation = ({ elements }) => (
  <Nav>
    {
      elements.map(({
        path, name, icon: IconComponent, active,
      }) => (
        <NavLink key={path} as={Link} to={path} aria-label={name}>
          <IconComponent active={active} />
        </NavLink>
      ))
    }
  </Nav>
);

Navigation.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(Component),
      ]),
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Navigation;
