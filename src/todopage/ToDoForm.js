import React from 'react';
import Input from '../components/Input';
import styled from 'styled-components';
import Label from '../components/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperPlane);

const FormContainer = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 7fr 1fr;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 40px;
`;

const ToDoSubmitButton = styled.button`
  background: skyblue;

  padding: 10px;
  border-radius: 30%;
`;

const SendToDoIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
`;

export default function ToDoForm({ onToDoSubmit, user }) {
  function handleSubmit(event, onToDoSubmit) {
    event.preventDefault();
    const newToDo = {
      title: event.target.title.value,
      author: user.username,
      status: 'active'
    };
    onToDoSubmit(newToDo);
  }

  return (
    <FormContainer onSubmit={event => handleSubmit(event, onToDoSubmit)}>
      <Label htmlFor="title" label="Aufgabe" />
      <Input name="title" required />
      <ToDoSubmitButton>
        <SendToDoIcon icon="paper-plane" />
      </ToDoSubmitButton>
    </FormContainer>
  );
}

//      <ToDoSubmitButton />
