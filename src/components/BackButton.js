import styled from 'styled-components';
import React from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import arrowBack from '../assets/arrow-back.svg';

const BackIcon = styled.a`
  cursor: pointer;
  display: inline-block;
  padding: 1rem;
  margin: -1rem;
  margin-bottom: 2rem;
  width: 1.5rem;
`;

const BackButton = ({ history }) => (
  <BackIcon onClick={() => history.goBack()}>
    <img src={arrowBack} alt="Go back" />
  </BackIcon>
);

BackButton.propTypes = {
  history: CustomPropTypes.history.isRequired,
};

export default BackButton;
