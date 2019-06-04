import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Label from '../components/Label';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

const StyledForm = styled.form`
  display: grid;
  grid-gap: 15px;
  margin: 0 20px 20px 20px;
`;

export default function Form({ onFormSubmit, history }) {
  function handleSubmit({ event, onFormSubmit, history }) {
    event.preventDefault();
    const form = event.target;
    const newEntry = {
      title: form.title.value,
      author: form.author.value,
      activities: form.activities.value
        .split(',')
        .map(value => value.trim())
        .filter(value => Boolean(value)),
      description: form.description.value
    };
    onFormSubmit(newEntry, history);
  }

  return (
    <StyledForm
      onSubmit={event => handleSubmit({ event, onFormSubmit, history })}
    >
      <Label htmlFor="title" label="Datum" />
      <Input name="title" required placeholder="Donnerstag, 09.05.2019" />
      <Label htmlFor="author" label="Autor" />
      <Input name="author" required placeholder="Anna" />
      <Label htmlFor="activities" label="Aktivitäten" />
      <Input
        name="activities"
        required
        placeholder="Spaziergang, Mittagessen, ..."
      />
      <Label htmlFor="description" label="Was hast Du von heute zu erzählen?" />
      <Input name="description" />
      <SubmitButton>Eintrag abschicken</SubmitButton>
    </StyledForm>
  );
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
