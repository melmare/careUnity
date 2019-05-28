import React from 'react';
import Input from '../components/Input';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

const FormContainer = styled.form`
  display: flex;
`;
const ToDoInput = styled(Input)``;
const NameInput = styled(Input)``;
const ToDoSubmitButton = styled(SubmitButton)`
  padding: 15px;
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
      <ToDoInput label="Aufgabe" name="title" required />
      <NameInput label="Name" name="author" required />
      <ToDoSubmitButton />
    </FormContainer>
  );
}
