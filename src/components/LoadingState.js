import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from './Layout';
import loading from '../assets/loading.svg';

const LargeIcon = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin: auto;
`;

const LoadingState = ({ inner }) => (
  <Layout spanned centered light inner={inner}>
    <LargeIcon src={loading} alt="Loading" />
  </Layout>
);

LoadingState.defaultProps = {
  inner: false,
};

LoadingState.propTypes = {
  inner: PropTypes.bool,
};

export default LoadingState;
