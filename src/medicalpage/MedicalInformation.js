import React from 'react';
import styled from 'styled-components';
import MedicalIcon from './MedicalIcon';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faPrescriptionBottle
} from '@fortawesome/free-solid-svg-icons';

import SingleMedication from './SingleMedication';
import MedicationForm from './MedicationForm';

library.add(faEdit, faPrescriptionBottle);

const MedicalInformationContainer = styled.section`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 20% 80%;
  border: grey solid 1px;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  align-items: center;
`;

const MedicationListContainer = styled.ul`
  display: grid;
  grid-row: 2;
  grid-column: 2 / span 4;
  list-style: none;
`;

export default function MedicalInformation({
  medicationList,
  onSingleMedicationSubmit,
  onSingleMedicationDelete,
  onSingleMedicationChange
}) {
  return (
    <MedicalInformationContainer>
      <MedicalIcon icon="prescription-bottle" />
      <MedicationListContainer>
        {medicationList.map(singleMedication => (
          <SingleMedication
            singleMedication={singleMedication}
            onSingleMedicationDelete={onSingleMedicationDelete}
            onSingleMedicationChange={onSingleMedicationChange}
          />
        ))}
      </MedicationListContainer>
      <MedicationForm onSingleMedicationSubmit={onSingleMedicationSubmit} />
    </MedicalInformationContainer>
  );
}
