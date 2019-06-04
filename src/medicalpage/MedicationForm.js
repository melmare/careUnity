import React, { useState } from 'react';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
import Input from '../components/Input';

const uid = require('uid');

const MedicationFormContainer = styled.form`
  display: grid;
`;
const CreateMedicationEntryButton = styled.button`
  grid-row: -1;
  grid-column: 2 / span 4;
  background: skyblue;
`;

export default function MedicationForm({ onSingleMedicationSubmit }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function onSubmit(event, onSingleMedicationSubmit) {
    event.preventDefault();
    const newSingleMedication = {
      id: uid(),
      time: event.target.time.value,
      medicine: event.target.medicine.value,
      dosage: event.target.dosage.value
    };
    onSingleMedicationSubmit(newSingleMedication);
    setIsFormVisible(!isFormVisible);
  }

  return (
    <>
      {isFormVisible ? (
        <MedicationFormContainer
          onSubmit={event => onSubmit(event, onSingleMedicationSubmit)}
        >
          <label>
            Tageszeit
            <select name="time">
              <option value="morning" name="Morgens">
                Morgens
              </option>
              <option value="midday">Mittags</option>
              <option value="evening">Abends</option>
              <option value="onDemand">Bei Bedarf</option>
            </select>
          </label>
          <label>
            Medikament
            <Input name="medicine" required />
          </label>
          <label>
            Dosierung
            <Input name="dosage" required />
          </label>
          <SubmitButton>Abschicken</SubmitButton>
          <SubmitButton onClick={() => setIsFormVisible(!isFormVisible)}>
            Abbrechen
          </SubmitButton>
        </MedicationFormContainer>
      ) : (
        <CreateMedicationEntryButton
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          Neues Medikament hinzufügen
        </CreateMedicationEntryButton>
      )}
    </>
  );
}
