import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.a`
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  line-height: ${({ theme }) => theme.font.lineHeight.label};
  font-size: ${({ theme }) => theme.font.size.label.primary};
  margin-top: 1rem;
  text-align: center;
  outline: none;
  padding: 1.2rem 2rem;
  width: 100%;
  transition:
    transform ${({ theme }) => theme.effects.transition.quick},
    background ${({ theme }) => theme.effects.transition.quick};

  ${({ primary, theme, danger }) => primary && css`
    background: ${theme.color.accent.primary.base};
    color: ${theme.color.text.tertiary};

    ${danger && css`
      background: ${theme.color.accent.error};
    `}
  `}
  
  ${({ secondary, theme }) => secondary && css`
    border: ${theme.size.line} solid ${theme.color.accent.primary.base};
    color: ${theme.color.accent.primary.base};
    background: ${theme.color.background.base};
  `}

  ${({ blocked, theme }) => blocked && css`
    background: ${theme.color.accent.primary.base};
  `}

  ${({ blocked, theme }) => {
    if (!blocked) {
      return css`
        &:active {
          transform: ${theme.effects.pressed};
        }`;
    }

    return css`
      background: ${theme.color.accent.blocked};
    `;
  }}
`;

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default Button;
