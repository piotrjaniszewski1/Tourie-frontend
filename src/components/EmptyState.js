import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './Label';
import Layout from './Layout';

const EmptyState = ({ heading, message }) => (
  <Layout spanned centered light>
    <Label size="primary" center>{heading}</Label>
    <Label center>{message}</Label>
  </Layout>
);

EmptyState.propTypes = {
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmptyState;
