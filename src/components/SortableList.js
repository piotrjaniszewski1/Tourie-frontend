import React from 'react';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const List = styled.ul`
  margin: 0;
  padding: 1rem 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const SortableItem = SortableElement(({ children }) => <ListItem>{children}</ListItem>);

const SortableList = SortableContainer(({ children }) => (
  <List>
    {children.map((element, index) => (
      <SortableItem key={element.props.id} index={index}>
        {element}
      </SortableItem>
    ))}
  </List>
));

export default SortableList;
