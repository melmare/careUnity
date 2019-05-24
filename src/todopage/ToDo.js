import React, { useState, useEffect } from 'react';
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
  display: grid;
  grid-template-columns: 40px 1fr 1fr 40px;
  grid-template-rows: 1fr 1fr;
`;

const ToDoTitle = styled.p`
grid-column: 2;
grid-row: 1;`

const ToDoAuthor = styled.small`
grid-column: 2;
grid-row: 2;`

const StatusButton = styled.button`
grid-row: 1 / span 2;
`

const DeleteButton = styled.button`
grid-column: 4;
`;

const Label = styled.label`
font-size: 12px;`

const ToDoResponsiblePersonForm = styled.form`
grid-row: 2;
grid-column: 3;
background: white;`

const NameInput = styled.input`
grid-row: 2;
grid-column: 3;
background: hotpink;`

const Name = styled.p`
grid-row: 2;
grid-column: 3;
background: white;`

export default function ToDo({ toDo, onToDoStatusChange, onToDoDelete }) {
  const { title, author, status } = toDo;
  const [isEditable, setIsEditable] = useState(false)

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

  function onResponsibleChange(event) {
event.preventDefault()
console.log('enter')
setIsEditable(false)

    }
  
  return (
    <ToDoContainer status={status}>
      <ToDoTitle>{title}</ToDoTitle>
      <ToDoAuthor>erstellt von {author}</ToDoAuthor>
      <Label HTMLfor="personInCharge">Wer übernimmt?</Label>

{isEditable ? 
  <NameInput hidden={!isEditable} onBlur={() => setIsEditable(false)}/>
  : 
  <Name onClick={() => setIsEditable(!isEditable)}>Wer übernimmt?</Name>
}

  
      
      
      
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
