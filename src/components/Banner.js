import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import Title from './Title';

const Content = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 2rem 2rem 0;
  margin-bottom: -1.5rem;
  bottom: 0;
`;

const BannerBackground = styled.div`
  position: absolute;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 50vh;
  height: 55vw;
  max-height: 60vh;
`;

const Banner = ({ children, title, image }) => (
  <BannerBackground image={image}>
    <Content>
      <Title title={title} inverse />
      {children}
    </Content>
  </BannerBackground>
);

Banner.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

Banner.defaultProps = {
  image: '',
  title: '',
  children: [],
};

export default Banner;
