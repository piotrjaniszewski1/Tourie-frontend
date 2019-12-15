import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import star from '../assets/star.svg';

const Wrapper = styled.a`
  display: block;
  position: relative;
  height: 6rem;
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  transition: background ${({ theme }) => theme.effects.transition.quick};
  
  &::after {
    position: absolute;
    display: block;
    content: "";
    background: url(${star}) no-repeat;
    background-size: 3rem 3rem;
    background-position: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.effects.transition.quick};
  }

  ${({ selected }) => selected && css`
    background: ${({ theme }) => theme.effects.overlay.primary};

    &::after {
      opacity: 1;
    }
  `}
`;

const Image = styled.div`
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  width: 6rem;
  height: 6rem;
`;

const SelectableImage = ({
  src, selected, onClick, id,
}) => (
  <Wrapper onClick={() => onClick(id)}>
    <Overlay selected={selected} />
    <Image image={src} />
  </Wrapper>
);

SelectableImage.defaultProps = {
  selected: false,
};

SelectableImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default SelectableImage;
