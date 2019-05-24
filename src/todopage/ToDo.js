import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

const DeleteIcon = styled(FontAwesomeIcon)``;

function getColor(status) {
  if (status === 'active') {
    return 'red';
  } else if (status === 'inProgress') {
    return 'yellow';
  } else {
    return 'green';
  }
}

function getNewStatus(status) {
  if (status === 'active') {
    return 'inProgress';
  } else if (status === 'inProgress') {
    return 'complete';
  } else if (status === 'complete') {
    return 'active';
  } else {
    return 'active';
  }
}

const ToDoContainer = styled.div`
  border: gray 1px solid;
  background: ${props => getColor(props.status)};
`;

const ToDoTitle = styled.p``;

const ToDoAuthor = styled.small``;

const StatusButton = styled.button``;

const DeleteButton = styled.button`
  background: white;
`;

export default function ToDo({ toDo, onToDoStatusChange, onToDoDelete }) {
  const { title, author, status } = toDo;

  function onStatusBtnClick(event, onToDoStatusChange) {
    const changedToDo = {
      title,
      author,
      status: getNewStatus(status)
    };
    onToDoStatusChange(changedToDo);
  }

  function onDeleteBtnClick(event, onToDoDelete) {
    const deletedToDo = { title, author, status };
    onToDoDelete(deletedToDo);
  }
  return (
    <ToDoContainer status={status}>
      <ToDoTitle>{title}</ToDoTitle>
      <ToDoAuthor>erstellt von {author}</ToDoAuthor>
      <StatusButton
        onClick={event => onStatusBtnClick(event, onToDoStatusChange)}
      >
        {status}
      </StatusButton>
      <DeleteButton onClick={event => onDeleteBtnClick(event, onToDoDelete)}>
        <DeleteIcon icon="trash" />
      </DeleteButton>
    </ToDoContainer>
  );
}
