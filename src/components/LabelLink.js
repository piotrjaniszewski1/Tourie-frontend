import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const LabelLink = styled.a`
  cursor: pointer;
  line-height: ${({ theme }) => theme.font.lineHeight.label};
  color: ${({ theme }) => theme.color.accent.primary.base};
  font-weight: ${({ theme }) => theme.font.weight.bold};

  ${({ block }) => block && css`
    display: inline-block;
    padding: 1rem;
    margin: -1rem;
  `}
  
  ${({ center }) => center && css`
    margin-left: auto;
    margin-right: auto;
  `}
  
  ${({ right }) => right && css`
    margin-left: auto;
    float: right;
  `}

  ${({ last }) => last && `
    margin-top: 0;
  `}
`;

LabelLink.propTypes = {
  block: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

export default LabelLink;
