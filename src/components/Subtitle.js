import styled, { css } from 'styled-components';

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.label.primary};
  margin: 0 0 0.3rem;

  ${({ small }) => small && css`
    font-size: ${({ theme }) => theme.font.size.label.secondary};
    margin: 0 0 0.2rem;
  `}
`;

export default Subtitle;
