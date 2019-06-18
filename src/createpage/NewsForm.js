import React from 'react';
import Input from '../components/Input';
import Label from '../components/Label';
import styled from 'styled-components';
import Button from '../components/Button';

const uid = require('uid');

const StyledForm = styled.form`
  display: grid;
  grid-gap: 15px;
  margin: 0 20px 20px 20px;
`;

export default function Form({
  entry,
  onNewsCreation,
  onDataChange,
  hideForm,
  user
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (entry) {
      const changedEntry = {
        id: entry.id,
        title: form.title.value,
        author: entry.author,
        color: entry.color,
        activities: form.activities.value
          .split(',')
          .map(value => value.trim())
          .filter(value => Boolean(value)),
        description: form.description.value
      };
      onDataChange('newsList', changedEntry);
      hideForm();
    } else {
      const newEntry = {
        id: uid(),
        title: form.title.value,
        author: user.username,
        color: user.usercolor,
        activities: form.activities.value
          .split(',')
          .map(value => value.trim())
          .filter(value => Boolean(value)),
        description: form.description.value
      };
      onNewsCreation(newEntry);
    }
  }

  return (
    <StyledForm onSubmit={event => handleSubmit(event)}>
      <Label htmlFor="title" label="Datum" />
      <Input
        name="title"
        required
        placeholder="Donnerstag, 09.05.2019"
        defaultValue={entry && entry.title}
      />

      <Label htmlFor="activities" label="Aktivitäten" />
      <Input
        name="activities"
        required
        placeholder="Spaziergang, Mittagessen, ..."
        defaultValue={entry && entry.activities}
      />
      <Label htmlFor="description" label="Was hast Du von heute zu erzählen?" />
      <Input name="description" defaultValue={entry && entry.description} />
      <Button>Eintrag abschicken</Button>
    </StyledForm>
  );
}
