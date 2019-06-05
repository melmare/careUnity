import React, { useState } from 'react';
import styled from 'styled-components';
import { EditStatusIcon } from './EditStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
  faEdit,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faEdit, faCheckSquare);

const StyledInput = styled.input`
  width: 100%;
`;

const SingleMedicationContainer = styled.li`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr 2fr 1fr 1fr;
  list-style: none;
`;

const TimeContainer = styled.div`
  width: 100%;
  grid-column: 1;
`;

const MedicineContainer = styled.div`
  width: 100%;
  grid-column: 2;
`;

const DosageContainer = styled.div`
  width: 100%;
  grid-column: 3;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  grid-column: 4;
`;

const DeleteButton = styled.button`
  grid-column: 4;
`;
const StyledEditStatusIcon = styled(EditStatusIcon)`
  grid-column: 5;
`;

export default function SingleMedication({
  singleMedication,
  onSingleMedicationDelete,
  onSingleMedicationChange
}) {
  const [isEditable, setIsEditable] = useState(false);
  const { id, time, medicine, dosage } = singleMedication;

  function getTimeIcon(time) {
    switch (time) {
      case 'morning':
        return '🌗';
      case 'midday':
        return '🌕';
      case 'evening':
        return '🌑';
      default:
        return '💊';
    }
  }
  function onDeleteBtnClick(event, onSingleMedicationDelete) {
    const deletedSingleMedication = { id, time, medicine, dosage };
    onSingleMedicationDelete(deletedSingleMedication);
  }
  function onSingleMedicationEdit(name, event, onSingleMedicationChange) {
    const newMedication = { ...singleMedication, [name]: event.target.value };
    onSingleMedicationChange(newMedication);
    console.log('edit');
  }
  return (
    <SingleMedicationContainer>
      {isEditable ? (
        <>
          <TimeContainer>
            <select
              name="time"
              onChange={event =>
                onSingleMedicationEdit('time', event, onSingleMedicationChange)
              }
            >
              <option value="morning">Morgens</option>
              <option value="midday">Mittags</option>
              <option value="evening">Abends</option>
              <option value="onDemand">Bei Bedarf</option>
            </select>
          </TimeContainer>
          <MedicineContainer>
            <StyledInput
              value={medicine}
              name="medicine"
              onChange={event =>
                onSingleMedicationEdit(
                  'medicine',
                  event,
                  onSingleMedicationChange
                )
              }
            />
          </MedicineContainer>
          <DosageContainer>
            <StyledInput
              value={dosage}
              name="dosage"
              onChange={event =>
                onSingleMedicationEdit(
                  'dosage',
                  event,
                  onSingleMedicationChange
                )
              }
            />
          </DosageContainer>
        </>
      ) : (
        <>
          <TimeContainer>{getTimeIcon(time)}</TimeContainer>
          <MedicineContainer>{medicine}</MedicineContainer>
          <DosageContainer>{dosage}</DosageContainer>
        </>
      )}
      <DeleteButton
        onClick={event => onDeleteBtnClick(event, onSingleMedicationDelete)}
      >
        <DeleteIcon icon="trash" />
      </DeleteButton>
      {isEditable ? (
        <StyledEditStatusIcon
          icon="check-square"
          onClick={() => setIsEditable(!isEditable)}
        />
      ) : (
        <StyledEditStatusIcon
          icon="edit"
          onClick={() => setIsEditable(!isEditable)}
        />
      )}
    </SingleMedicationContainer>
  );
}
