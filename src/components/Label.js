import styled, { css } from 'styled-components';

export const Label = styled.p`
  font-size: ${({ size, theme }) => theme.font.size.label[size || 'secondary']};
  margin: 0;

  ${({ center }) => center && css`
    text-align: center;
  `}

  ${({ inline }) => inline && css`
    display: inline;
    margin-right: 1em;
  `}
`;

export const ErrorLabel = styled(Label)`
  color: ${({ theme }) => theme.color.accent.error};
`;

export const SuccessLabel = styled(Label)`
  color: ${({ theme }) => theme.color.accent.primary.light};
`;
