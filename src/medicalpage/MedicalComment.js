import React, { useState } from 'react';
import styled from 'styled-components';
import MedicalIcon from './MedicalIcon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

library.add(faCommentMedical);

const MedicalCommentsContainer = styled.section`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 20% 80%;
  padding: 10px;
  border: grey solid 1px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  grid-gap: 10px;
  align-items: center;
`;

const MedicalCommentForm = styled.form`
  grid-column: 2;
  width: 90%;
`;

const CommentContainer = styled.div`
  grid-column: 2;
  border: grey solid 1px;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

const DateContainer = styled.div`
  font-size: 0.75rem;
  font-style: italic;
`;

const CreateCommentBtn = styled(Button)`
  grid-column: 2;
  width: 95%;
`;
export default function MedicalComment({ medicalComments, onNewData }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  function onSubmit(event) {
    event.preventDefault();
    const dateNow = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const newMedicalComment = {
      description: event.target.description.value,
      date: dateNow.toLocaleDateString('DE', options)
    };
    onNewData('medicalComments', newMedicalComment);
    event.target.description.value = '';
    setIsFormVisible(!isFormVisible);
  }
  return (
    <MedicalCommentsContainer>
      {isFormVisible ? (
        <MedicalCommentForm onSubmit={event => onSubmit(event)}>
          <Label label="Gib hier deinen Kommentar an" />
          <Input name="description" />
          <Button>Kommentar abschicken</Button>
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            Abbrechen
          </Button>
        </MedicalCommentForm>
      ) : (
        <>
          <MedicalIcon icon="comment-medical" />
          {medicalComments &&
            medicalComments.map(comment => (
              <CommentContainer>
                <DateContainer>{comment.date}</DateContainer>
                {comment.description}
              </CommentContainer>
            ))}
          <CreateCommentBtn onClick={() => setIsFormVisible(!isFormVisible)}>
            Neuen Kommentar anlegen
          </CreateCommentBtn>
        </>
      )}
    </MedicalCommentsContainer>
  );
}
