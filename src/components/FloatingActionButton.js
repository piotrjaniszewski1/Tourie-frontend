import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import plusIcon from '../assets/plus.svg';

const LinkWrapper = styled(Link)`
  position: fixed;
  right: 2rem;
  bottom: 6rem;
  background: ${({ theme }) => theme.color.background.dark};
  cursor: pointer;
  display: inline-block;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  z-index:  ${({ theme }) => theme.layer.floating};
`;

const FloatingActionButton = ({ to, name }) => (
  <LinkWrapper to={to} aria-label={name}>
    <img src={plusIcon} alt="Add" />
  </LinkWrapper>
);

FloatingActionButton.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FloatingActionButton;
