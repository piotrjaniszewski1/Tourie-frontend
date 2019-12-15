import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { LabelTagSwitch } from './LabelTag';
import close from '../assets/close.svg';

const Header = styled.header`
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.background.base};
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  display: flex;
  padding: 1.2rem 1.5rem;
  align-items: center;
  z-index: ${({ theme }) => theme.layer.navigation};
`;

const CloseIcon = styled.a`
  display: block;
  padding: 1rem;
  margin: -1rem;

  img {
    display: block;
    width: 1rem;
    margin-right: 1rem;
  }
`;

const RouteName = styled.h2`
  font-size: ${({ theme }) => theme.font.size.label.base};
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0 auto 0 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Switch = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const TourHeader = ({
  name, onRouteClose, modes, activeMode, onModeChange,
}) => (
  <Header>
    <CloseIcon onClick={onRouteClose}>
      <img src={close} alt="Close" />
    </CloseIcon>
    <RouteName>{name}</RouteName>
    <Switch>
      {modes.map(mode => (
        <LabelTagSwitch
          key={mode}
          name={mode}
          active={activeMode === mode}
          onClick={({ target }) => onModeChange(target.name)}
        >
          {mode}
        </LabelTagSwitch>
      ))}
    </Switch>
  </Header>
);

TourHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onRouteClose: PropTypes.func.isRequired,
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default TourHeader;
