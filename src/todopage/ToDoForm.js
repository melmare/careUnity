import React from 'react';
import Input from '../components/Input';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
import Label from '../components/Label';

const FormContainer = styled.form`
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 30px 30px;
  grid-template-columns: auto auto 25px;
  margin-bottom: 40px;
`;
const ToDoInput = styled(Input)`
  grid-row: 2;
  grid-column: 1;
`;
const NameInput = styled(Input)`
  grid-row: 2;
  grid-column: 2;
`;
const ToDoLabel = styled(Label)`
  grid-row: 1;
  grid-column: 1;
`;
const NameLabel = styled(Label)`
  grid-row: 2;
  grid-column: 2;
`;
const ToDoSubmitButton = styled(SubmitButton)`
  height: 100%;
  width: 100%;
  grid-row: 1 / span 2;
  grid-column: 3;
`;

export default function ToDoForm({ onToDoSubmit }) {
  function handleSubmit(event, onToDoSubmit) {
    event.preventDefault();
    const newToDo = {
      title: event.target.title.value,
      author: event.target.author.value,
      status: 'active'
    };
    onToDoSubmit(newToDo);
  }

  return (
    <FormContainer onSubmit={event => handleSubmit(event, onToDoSubmit)}>
      <ToDoLabel htmlFor="title" label="Aufgabe" />
      <NameLabel htmlFor="author" label="Name" />
      <ToDoInput name="title" required />
      <NameInput name="author" required />
      <ToDoSubmitButton />
    </FormContainer>
  );
}

//      <ToDoSubmitButton />
