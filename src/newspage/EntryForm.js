import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import styled from 'styled-components';
import SubmitButton from './SubmitButton';

const Form = styled.form`
  margin: 20px;
  display: grid;
`;
export default function EntryForm({ onFormSubmit }) {
  function onSubmit(event, handleFormSubmit) {
    event.preventDefault();
    const form = event.target;
    const newEntry = {
      title: form.title.value,
      author: form.author.value,
      description: form.description.value
    };
    handleFormSubmit(newEntry);
  }
  return (
    <Form onSubmit={event => onSubmit(event, onFormSubmit)}>
      <Input
        name="title"
        label="Datum"
        required
        placeholder="Donnerstag, 09.05.2019"
      />
      <Input name="author" label="Autor" required placeholder="Anna" />
      <Input name="description" label="Placeholder placeholder?" />
      <SubmitButton>Eintrag abschicken</SubmitButton>
    </Form>
  );
}

EntryForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
