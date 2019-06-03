import React from 'react';
import styled from 'styled-components';
import { EditStatusIcon } from './EditStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

const SingleMedicationContainer = styled.li`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 4fr 2fr 1fr repeat(4, auto)
  list-style: none;
`;

const TimeContainer = styled.div`
  grid-column: 1;
`;

const MedicineContainer = styled.div`
  grid-column: 2;
`;

const DosageContainer = styled.div`
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
  onSingleMedicationDelete
}) {
  const { id, time, medicine, dosage } = singleMedication;

  function getTimeIcon(time) {
    switch (time) {
      case 'morning':
        return '🌘';
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
  return (
    <SingleMedicationContainer>
      <TimeContainer>{getTimeIcon(time)}</TimeContainer>
      <MedicineContainer>{medicine}</MedicineContainer>
      <DosageContainer>{dosage}</DosageContainer>
      <DeleteButton
        onClick={event => onDeleteBtnClick(event, onSingleMedicationDelete)}
      >
        <DeleteIcon icon="trash" />
      </DeleteButton>
    </SingleMedicationContainer>
  );
}
