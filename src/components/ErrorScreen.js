import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Title from './Title';
import Layout from './Layout';

const ErrorScreen = ({
  inner, title, subtitle, message, buttonText, onButtonClick,
}) => (
  <Layout centered fitted narrow light inner={inner}>
    <Title>
      <em>{title}</em>
      <br />
      {subtitle}
    </Title>
    <p>{message}</p>
    <Button primary onClick={onButtonClick}>
      {buttonText}
    </Button>
  </Layout>
);

ErrorScreen.defaultProps = {
  inner: false,
};

ErrorScreen.propTypes = {
  inner: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default ErrorScreen;
