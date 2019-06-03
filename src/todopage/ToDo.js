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
  border-left: ${props => getColor(props.status)} 5px solid;
  display: grid;
  grid-template-columns: 40px 1fr 1fr 40px;
  grid-template-rows: 1fr 1fr;
`;

const ToDoTitle = styled.p`
  grid-column: 2;
  grid-row: 1;
`;

const ToDoAuthor = styled.small`
  grid-column: 2;
  grid-row: 2;
`;

const StatusButton = styled.button`
  grid-row: 1 / span 2;
`;

const DeleteButton = styled.button`
  grid-column: 4;
`;

const DistributionButton = styled.button`
  background: lightgray;
  padding: 5px;
  border-radius: 3%;
`;
const ToDoPersonInChargeContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 3;
  justify-self: center;
  align-self: center;
`;

const ToDoPersonInCharge = styled.div``;

export default function ToDo({
  toDo,
  onToDoStatusChange,
  onToDoDelete,
  user,
  onToDoDistribution
}) {
  const { title, author, status, isDistributed, personInCharge } = toDo;

  function onStatusBtnClick(event, onToDoStatusChange) {
    const changedToDo = {
      title,
      author,
      status: getNewStatus(status),
      isDistributed,
      personInCharge
    };
    onToDoStatusChange(changedToDo);
  }

  function onDeleteBtnClick(event, onToDoDelete) {
    const deletedToDo = {
      title,
      author,
      status,
      isDistributed,
      personInCharge
    };
    onToDoDelete(deletedToDo);
  }

  function onDistributionBtnClick(event, onToDoDistribution) {
    event.preventDefault();
    const distributedToDo = {
      title,
      author,
      status,
      isDistributed: true,
      personInCharge: user.username
    };
    onToDoDistribution(distributedToDo);
  }

  return (
    <ToDoContainer status={status}>
      <ToDoTitle>{title}</ToDoTitle>
      <ToDoAuthor>erstellt von {author}</ToDoAuthor>
      <ToDoPersonInChargeContainer>
        {isDistributed ? (
          <ToDoPersonInCharge>{personInCharge}</ToDoPersonInCharge>
        ) : (
          <DistributionButton
            onClick={event => onDistributionBtnClick(event, onToDoDistribution)}
          >
            Aufgabe übernehmen
          </DistributionButton>
        )}
      </ToDoPersonInChargeContainer>

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
