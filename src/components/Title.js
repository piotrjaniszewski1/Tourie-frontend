import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const TitleElement = styled.h1`
  font-size: ${({ theme }) => theme.font.size.heading.secondary};
  margin: 0.5em 0 1em;

  em {
    font-size: ${({ theme }) => theme.font.size.heading.primary};
    font-style: normal;
  }

  ${({ inverse }) => inverse && css`
    color: ${({ theme }) => theme.color.text.tertiary};
  `}
`;


const Title = ({ children, title, ...rest }) => (
  <TitleElement {...rest}>
    {title && title.split('\n').map(item => (
      <Fragment key={item}>
        {item}
        <br />
      </Fragment>
    ))}
    {children}
  </TitleElement>
);

Title.propTypes = {
  title: PropTypes.string,
  inverse: PropTypes.bool,
};

Title.defaultProps = {
  title: null,
  inverse: false,
};

export default Title;
