import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import Subtitle from './Subtitle';
import IconLabel from './IconLabel';
import location from '../assets/location.svg';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 6rem;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: calc(100% - 3rem);
  margin: 0 auto;
`;

const PrevWrapper = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.layer.content};
`;

const NextWrapper = styled(PrevWrapper)`
  right: 2rem;
`;

const NarrowCard = styled(Card)`
  width: 100%;
  margin: 0 auto;
`;

const MapTourNavigation = ({
  name, address, photo, nextComponent, prevComponent,
}) => (
  <Wrapper>
    <PrevWrapper>
      {prevComponent}
    </PrevWrapper>
    <CardWrapper>
      <NarrowCard insertLeft={<img src={photo} alt={name} />}>
        <Subtitle small as="h3">{name}</Subtitle>
        <IconLabel src={location} alt="City">{address}</IconLabel>
      </NarrowCard>
    </CardWrapper>
    <NextWrapper>
      {nextComponent}
    </NextWrapper>
  </Wrapper>
);

MapTourNavigation.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  nextComponent: PropTypes.node.isRequired,
  prevComponent: PropTypes.node.isRequired,
};

export default MapTourNavigation;
