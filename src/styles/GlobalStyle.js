import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Quicksand:500,700&subset=latin-ext');

  ${styledNormalize}

  :root {
    font-size: ${({ theme }) => theme.font.size.root};
  }

  html {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    overflow: -moz-scrollbars-none;
  }

  body {
    color: ${({ theme }) => theme.color.text.base};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.base};
    margin: 0;
    overflow-x: hidden;  
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.color.text.primary};
    line-height: ${({ theme }) => theme.font.lineHeight.heading}
  }

  h1 {
    font-size: ${({ theme }) => theme.font.size.heading.primary};
  }

  h2 {
    font-size: ${({ theme }) => theme.font.size.heading.secondary};
  }

  h3 {
    font-size: ${({ theme }) => theme.font.size.heading.tertiary};
  }

  p {
    line-height: ${({ theme }) => theme.font.lineHeight.text}; 
    color: ${({ theme }) => theme.color.text.base};
    margin: 1em 0 1.5em;
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    line-height: inherit;
    font-family: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
  }

  img {
    height: auto;
    max-width: 100%;
  }
`;

export default GlobalStyle;
