import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import Subtitle from './Subtitle';
import IconLabel from './IconLabel';
import LabelLink from './LabelLink';
import location from '../assets/location.svg';
import noImage from '../assets/no-image.png';

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10rem 0 1rem;
  position: relative;
  z-index: ${({ theme }) => theme.layer.content};
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  background-image: url(${({ image }) => image}), url(${noImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 16rem;
`;

const ListTourNavigation = ({
  name, address, photo, website, nextComponent, prevComponent,
}) => (
  <Wrapper>
    <BackgroundImage image={photo} />
    <NavWrapper>
      {prevComponent}
      {nextComponent}
    </NavWrapper>
    <Card>
      <Subtitle as="h3">{name}</Subtitle>
      <IconLabel src={location} alt="Location">{address}</IconLabel>
      {website && (
        <LabelLink
          right
          block
          last
          href={website}
          aria-label="Read more"
          target="_blank"
        >
          Read more
        </LabelLink>
      )}
    </Card>
  </Wrapper>
);

ListTourNavigation.defaultProps = {
  website: null,
};

ListTourNavigation.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string,
  nextComponent: PropTypes.node.isRequired,
  prevComponent: PropTypes.node.isRequired,
};

export default ListTourNavigation;
