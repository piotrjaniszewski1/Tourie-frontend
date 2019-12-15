import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  > * {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1rem 0;
  }
`;

const OptionList = ({ children }) => (
  <List>
    {(
      children.length ? children : [children]
    ).map((child, i) => <li key={i}>{child}</li>)}
  </List>
);

OptionList.defaultProps = {
  children: [],
};

OptionList.propTypes = {
  children: PropTypes.node,
};

export default OptionList;
