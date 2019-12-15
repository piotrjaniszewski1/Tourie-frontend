import styled from 'styled-components';

const Section = styled.div`
  margin: 3rem 0 1rem;

  &:first-child {
    margin-top: 0;
  }

  > h2,
  > h3 {
    display: block;
    color: ${({ theme }) => theme.color.text.primary};
    font-size: ${({ theme }) => theme.font.size.label.secondary};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin: 0 0 1em;
  }
`;

export default Section;
