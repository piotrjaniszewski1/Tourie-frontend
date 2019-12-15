import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import NextIcon from './icons/NextIcon';
import PrevIcon from './icons/PrevIcon';

const ButtonWrapper = styled(Button)`
  margin: 0;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4rem;
  width: 2.4rem;
  
  ${({ prev, theme }) => prev && css`
    background: ${theme.color.background.base};
  `}

  ${({ next, theme }) => next && css`
    background: ${theme.color.accent.primary.base};
  `}
`;

const NavigationButton = ({
  next, prev, blocked, onClick,
}) => (
  <ButtonWrapper
    as="button"
    blocked={blocked}
    next={next}
    prev={prev}
    onClick={onClick}
  >
    {next && <NextIcon small active={!blocked} inverse />}
    {prev && <PrevIcon small active={!blocked} />}
  </ButtonWrapper>
);

NavigationButton.defaultProps = {
  next: false,
  prev: false,
  blocked: false,
};

NavigationButton.propTypes = {
  next: PropTypes.bool,
  prev: PropTypes.bool,
  blocked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default NavigationButton;
