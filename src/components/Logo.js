import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/logo.svg';

const LogoWrapper = styled.div`
  ${({ welcome }) => welcome && css`
    margin: 30% 0 5%; 
  `}

  img {
    width: 8rem;
    display: block;
  }

  p {
    font-size: ${({ theme }) => theme.font.size.label.primary};
    margin-top: 0.5rem;
  }
`;

const Logo = ({ subtitle, welcome }) => (
  <LogoWrapper welcome={welcome}>
    <img src={logo} alt="Tourie" />
    {subtitle && <p>{subtitle}</p>}
  </LogoWrapper>
);

Logo.propTypes = {
  subtitle: PropTypes.string,
  welcome: PropTypes.bool,
};

Logo.defaultProps = {
  subtitle: null,
  welcome: false,
};

export default Logo;
