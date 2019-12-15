import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const CardWrapper = styled.div`
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background: ${({ theme }) => theme.color.background.base};
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  width: 100%;

  ${({ topFlat }) => topFlat && css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `};

  ${({ bottomFlat }) => bottomFlat && css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `};
`;

const CardContent = styled.div`
  flex-grow: 1;
  padding: 1.2rem 1.5rem;
`;

const InsertLeft = styled.div`
  min-width: 100px;
  max-width: 100px;
  position: relative;

  & > * {
    position: absolute;
    border-top-left-radius: ${({ theme }) => theme.size.borderRadius};
    border-bottom-left-radius: ${({ theme }) => theme.size.borderRadius};
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Card = ({ children, insertLeft, ...rest }) => (
  <CardWrapper {...rest}>
    {insertLeft && <InsertLeft>{insertLeft}</InsertLeft>}
    <CardContent>{children}</CardContent>
  </CardWrapper>
);

Card.defaultProps = {
  children: [],
  insertLeft: null,
  bottomFlat: false,
  topFlat: false,
};

Card.propTypes = {
  children: PropTypes.node,
  insertLeft: PropTypes.node,
  bottomFlat: PropTypes.bool,
  topFlat: PropTypes.bool,
};

export default Card;
