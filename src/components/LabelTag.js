import styled, { css } from 'styled-components';

const LabelBase = styled.a`
  cursor: pointer;
  display: inline-block; 
  user-select: none;
  border: ${({ theme }) => theme.size.border} solid ${({ theme }) => theme.color.accent.secondary}; 
  line-height: ${({ theme }) => theme.font.lineHeight.label};
  transition:
    transform ${({ theme }) => theme.effects.transition.quick},
    background ${({ theme }) => theme.effects.transition.quick};

  ${({ active }) => active && css`
    background: ${({ theme }) => theme.color.accent.secondary};
    color: ${({ theme }) => theme.color.text.tertiary};
  `}
`;

export const LabelTag = styled(LabelBase)`
  font-size: ${({ theme }) => theme.font.size.label.secondary};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem 0.5rem 0;
  border-radius: ${({ theme }) => theme.size.borderRadius};

  &:active {
    transform: ${({ theme }) => theme.effects.pressed};
  }
`;

export const LabelTagSwitch = styled(LabelBase)`
  font-size: ${({ theme }) => theme.font.size.label.tertiary};
  padding: 0.3rem 0.7rem;
  border-left: none;
  border-right: none;
  
  &:first-of-type {
    border-left: ${({ theme }) => theme.size.border} solid ${({ theme }) => theme.color.accent.secondary}; 
    border-top-left-radius: ${({ theme }) => theme.size.borderRadius};
    border-bottom-left-radius: ${({ theme }) => theme.size.borderRadius};
  }

  &:last-of-type {
    border-right: ${({ theme }) => theme.size.border} solid ${({ theme }) => theme.color.accent.secondary}; 
    border-top-right-radius: ${({ theme }) => theme.size.borderRadius};
    border-bottom-right-radius: ${({ theme }) => theme.size.borderRadius};
  }
`;
