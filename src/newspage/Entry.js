import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import Author from './Author';
import Description from './Description';
import Activity from './Activity';
import Activities from './Activities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EntryContainer = styled.article`
  background: lightgray;
  border-radius: 3%;
  margin-bottom: 30px;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

const EntryHeader = styled.header`
  background: silver;
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

export default function Entry({ entry, onNewsDelete }) {
  const { title, author, activities, description } = entry;

  function onDeleteBtnClick(event, onNewsDelete) {
    const deletedEntry = {
      ...entry
    };
    onNewsDelete(deletedEntry);
  }
  return (
    <EntryContainer>
      <EntryHeader>
        <Title>{title}</Title>
        <DeleteIcon
          icon="trash"
          onClick={event => onDeleteBtnClick(event, onNewsDelete)}
        />
      </EntryHeader>

      <Author>Erstellt von {author}</Author>
      <Activities>
        {activities.map(activity => (
          <Activity activity={activity} key={activities.indexOf(activity)} />
        ))}
      </Activities>

      <Description>{description}</Description>
    </EntryContainer>
  );
}
