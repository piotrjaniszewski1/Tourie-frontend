import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import arrowForward from '../assets/arrow-forward.svg';
import Card from './Card';
import { Label } from './Label';

const ForwardIcon = styled.img`
  cursor: pointer;
  display: inline-block;
  padding: 1rem;
  margin: -1rem;
  width: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.heading.tertiary};
`;

const ActionableTitleBox = ({ title, subtitle, actionName }) => (
  <Card>
    <Content>
      <div>
        <Title>{title}</Title>
        <Label>{subtitle}</Label>
      </div>
      <div>
        <ForwardIcon src={arrowForward} alt={actionName} />
      </div>
    </Content>
  </Card>
);

ActionableTitleBox.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
};

export default ActionableTitleBox;
