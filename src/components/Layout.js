import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;

  ${({ fitted }) => fitted && css`
    height: ${window.innerHeight}px;
  `}

  ${({ spanned }) => spanned && css`
    min-height: ${window.innerHeight}px;
  `}

  ${({ centered }) => centered && css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}

  ${({ distributed }) => distributed && css`
    display: flex;
  `}

  ${({ light }) => light && css`
    background: ${({ theme }) => theme.color.background.light};
  `}

  ${({ inner, theme }) => inner && css`
    background: ${theme.color.background.base};
    height: auto;
    min-height: auto;
    padding: 2rem 0;
  `}
`;

const Content = styled.div`
  ${({ distributed }) => distributed && css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  `}

  ${({ narrow }) => narrow && css`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  `}

  ${({ elongated }) => elongated && css`
    margin-bottom: 5rem;
  `}

  ${({ pushed }) => pushed && css`
    padding-top: 2rem;
  `}

  ${({ squeezed }) => squeezed && css`
    height: ${window.innerHeight}px;
    padding-top: 2rem;
    padding-bottom: 2.625rem;
  `}
`;

const Layout = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    <Content {...rest}>
      {children}
    </Content>
  </Wrapper>
);

Layout.defaultProps = {
  fitted: false,
  elongated: false,
  spanned: false,
  narrow: false,
  pushed: false,
  centered: false,
  distributed: false,
  squeezed: false,
  light: false,
  inner: false,
};

Layout.propTypes = {
  fitted: PropTypes.bool,
  elongated: PropTypes.bool,
  centered: PropTypes.bool,
  spanned: PropTypes.bool,
  narrow: PropTypes.bool,
  pushed: PropTypes.bool,
  distributed: PropTypes.bool,
  squeezed: PropTypes.bool,
  light: PropTypes.bool,
  inner: PropTypes.bool,
};

export default Layout;
