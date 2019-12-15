import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 6rem;
  width: calc(100% + 4rem);
  display: flex;
  overflow-x: auto;
  margin: 0 -2rem;
  padding: 0 2rem;

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
  }

  > * {
    flex-shrink: 0;
    margin-right: 1rem;

    &:last-of-type {
      margin-right: 0;
      padding-right: 2rem;
    }
  } 
`;

const ScrollingHorizontally = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

ScrollingHorizontally.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollingHorizontally;
