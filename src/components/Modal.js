import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: ${window.innerHeight}px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.layer.modal};
  background: ${({ theme }) => theme.effects.overlay.dark};
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = ({ onClose, children }) => (
  <Wrapper onClick={onClose}>
    <Card onClick={e => e.stopPropagation()}>
      {children}
    </Card>
  </Wrapper>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
