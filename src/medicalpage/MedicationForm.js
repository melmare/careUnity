import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
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

export default function MedicationForm({ onNewData }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const newSingleMedication = {
      id: uid(),
      time: event.target.time.value,
      medicine: event.target.medicine.value,
      dosage: event.target.dosage.value
    };
    onNewData('medicationList', newSingleMedication);
    setIsFormVisible(!isFormVisible);
  }

  return (
    <>
      {isFormVisible ? (
        <MedicationFormContainer onSubmit={event => onSubmit(event)}>
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
          <Button>Abschicken</Button>
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            Abbrechen
          </Button>
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
