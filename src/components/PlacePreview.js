import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import sortableElementClass from '../styles/helperClasses';
import Subtitle from './Subtitle';
import IconLabel from './IconLabel';
import locationIcon from '../assets/location.svg';
import categoryIcon from '../assets/category.svg';
import deleteIcon from '../assets/delete.svg';
import CustomPropTypes from '../utils/CustomPropTypes';

const Wrapper = styled.div`
  box-sizing: border-box;
  border: ${({ theme }) => theme.size.line} solid transparent;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  display: flex;
  background: transparent;
  align-items: center;
  margin: -1rem -1rem 1rem;
  padding: 1rem;
  
  .${sortableElementClass} & {
    background: ${({ theme }) => theme.effects.overlay.light};
    border-color: ${({ theme }) => theme.color.elements.line}; 
  }
`;

const Index = styled.span`
  font-size: ${({ theme }) => theme.font.size.label.secondary};
  color: ${({ theme }) => theme.color.text.secondary};
  margin-right: 1rem;
  width: 1rem;
  text-align: right;

  &::after {
    content: '.';
  }
`;

const Content = styled.div`
  margin-right: auto;
`;

const DeleteIcon = styled.a`
  cursor: pointer;
  display: block;
  width: 2rem;
  height: 2rem;
  background: url(${deleteIcon});
  background-size: 1.5rem 1.5rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const PlacePreview = ({
  position, name, address, categories, onDelete,
}) => (
  <Wrapper>
    <Index>{position}</Index>
    <Content>
      <Subtitle>{name}</Subtitle>
      <IconLabel src={locationIcon} alt="Address">{address}</IconLabel>
      <IconLabel src={categoryIcon} alt="Category">{categories[0].name}</IconLabel>
    </Content>
    {onDelete && <DeleteIcon onClick={onDelete} />}
  </Wrapper>
);

PlacePreview.defaultProps = {
  onDelete: null,
};

PlacePreview.propTypes = {
  onDelete: PropTypes.func,
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  categories: CustomPropTypes.categories.isRequired,
};

export default PlacePreview;
