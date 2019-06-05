import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
  faHourglassStart,
  faHourglassHalf,
  faHourglassEnd
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faHourglassStart, faHourglassHalf, faHourglassEnd);

const DeleteIcon = styled(FontAwesomeIcon)``;

const StatusIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
`;

function getColor(status) {
  switch (status) {
    case 'inProgress':
      return 'yellow';
    case 'complete':
      return 'green';
    default:
      return 'red';
  }
}

function getNewStatus(status) {
  switch (status) {
    case 'active':
      return 'inProgress';
    case 'inProgress':
      return 'complete';
    default:
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
  background: skyblue;
  padding: 5px;
  border-radius: 5px;
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

  function getStatusIcon(status) {
    switch (status) {
      case 'inProgress':
        return <StatusIcon icon="hourglass-half" />;
      case 'complete':
        return <StatusIcon icon="hourglass-end" />;
      default:
        return <StatusIcon icon="hourglass-start" />;
    }
  }

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
      ...toDo
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
        disabled={!onToDoStatusChange}
      >
        {getStatusIcon(status)}
      </StatusButton>
      {(user.username === author || user.username === personInCharge) && (
        <DeleteButton
          onClick={event => onDeleteBtnClick(event, onToDoDelete)}
          disabled={!onToDoDelete}
        >
          <DeleteIcon icon="trash" />
        </DeleteButton>
      )}
    </ToDoContainer>
  );
}
