import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label } from './Label';

const SmallIcon = styled.img`
  width: 1em;
  margin-right: 2px;
  position: relative;
  top: 2px;
`;

const IconLabel = ({
  src, alt, block, children,
}) => (
  <Label size="tertiary" inline={!block}>
    <SmallIcon src={src} alt={alt} />
    {children}
  </Label>
);

IconLabel.defaultProps = {
  block: false,
};

IconLabel.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default IconLabel;
