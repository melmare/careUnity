import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Author from './Author';
import Description from './Description';
import Activity from './Activity';
import Activities from './Activities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewsForm from '../createpage/NewsForm';

const EntryContainer = styled.article`
  border-radius: 3%;
  margin-bottom: 30px;
  box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

const EditIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;
const EntryHeader = styled.header`
  background: ${props => props.color};
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 20px 5px 20px;
  width: 100%;
`;

export default function Entry({
  entry,
  onNewsDelete,
  onSaveChangedNewsEntry,
  user
}) {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const { title, author, activities, description } = entry;

  return (
    <EntryContainer>
      <EntryHeader color={entry.color}>
        {user.username === entry.author && onNewsDelete && (
          <DeleteIcon icon="trash" onClick={() => onNewsDelete(entry)} />
        )}
        <Title>{title}</Title>
        {user.username === entry.author && onSaveChangedNewsEntry && (
          <EditIcon
            icon="edit"
            onClick={() => setEditFormVisible(!isEditFormVisible)}
          />
        )}
      </EntryHeader>
      {isEditFormVisible ? (
        <NewsForm
          entry={entry}
          onSaveChangedNewsEntry={onSaveChangedNewsEntry}
          hideForm={() => setEditFormVisible(!isEditFormVisible)}
        />
      ) : (
        <>
          <Author>Erstellt von {author}</Author>
          <Activities>
            {activities.map(activity => (
              <Activity
                activity={activity}
                key={activities.indexOf(activity)}
              />
            ))}
          </Activities>

          <Description>{description}</Description>
        </>
      )}
    </EntryContainer>
  );
}
