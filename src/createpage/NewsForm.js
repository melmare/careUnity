import React from 'react';
import Input from '../components/Input';
import Label from '../components/Label';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

const uid = require('uid');

const StyledForm = styled.form`
  display: grid;
  grid-gap: 15px;
  margin: 0 20px 20px 20px;
`;

export default function Form({ entry, onNewsCreation }) {
  function handleSubmit({ event, entry, onNewsCreation }) {
    event.preventDefault();
    if (entry) {
      console.log('newsForm if');
    } else {
      const form = event.target;
      const newEntry = {
        id: uid(),
        title: form.title.value,
        author: form.author.value,
        activities: form.activities.value
          .split(',')
          .map(value => value.trim())
          .filter(value => Boolean(value)),
        description: form.description.value
      };
      console.log('newsForm else');
      onNewsCreation(newEntry);
    }
  }

  return (
    <StyledForm
      onSubmit={event =>
        handleSubmit({
          event,
          entry,
          onNewsCreation
        })
      }
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
