import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

const StyledForm = styled.form`
  display: grid;
  margin: 0 20px 20px 20px;
`;
export default function Form({ onFormSubmit, history }) {
  function handleSubmit({ event, onFormSubmit, history }) {
    event.preventDefault();
    const form = event.target;
    const activities = form.activities.value
      .split(',')
      .map(value => value.trim())
      .filter(value => Boolean(value));
    const newEntry = {
      title: form.title.value,
      author: form.author.value,
      activities,
      description: form.description.value
    };
    onFormSubmit(newEntry, history);
  }
  return (
    <StyledForm
      onSubmit={event => handleSubmit({ event, onFormSubmit, history })}
    >
      <Input
        name="title"
        label="Datum"
        required
        placeholder="Donnerstag, 09.05.2019"
      />
      <Input name="author" label="Autor" required placeholder="Anna" />
      <Input
        name="activities"
        label="Aktivitäten"
        required
        placeholder="Spaziergang, Mittagessen, ..."
      />
      <Input name="description" label="Placeholder placeholder?" />
      <SubmitButton>Eintrag abschicken</SubmitButton>
    </StyledForm>
  );
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};
