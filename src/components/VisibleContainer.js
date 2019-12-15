import styled from 'styled-components';

const VisibleContainer = styled.div`
  ${({ visible }) => !visible && `
    display: none;
  `}
`;

export default VisibleContainer;
