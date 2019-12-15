import styled, { css } from 'styled-components';

const SvgElement = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: ${({ theme }) => theme.color.elements.icon.base};
  stroke: ${({ theme }) => theme.color.elements.icon.base};
  transition:
    fill ${({ theme }) => theme.effects.transition.base},
    stroke ${({ theme }) => theme.effects.transition.base};

  ${({ small }) => small && css`
    width: 1rem;
    height: 1rem;
  `}

  ${({ active }) => active && css`
    fill: ${({ theme }) => theme.color.elements.icon.active};
    stroke: ${({ theme }) => theme.color.elements.icon.active};
  `}

  ${({ inverse }) => inverse && css`
    fill: ${({ theme }) => theme.color.elements.icon.inverse};
    stroke: ${({ theme }) => theme.color.elements.icon.inverse};
  `}
`;

export default SvgElement;
