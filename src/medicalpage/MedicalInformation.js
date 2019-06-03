import React from 'react';
import styled from 'styled-components';
import MedicalIcon from './MedicalIcon';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faPrescriptionBottle
} from '@fortawesome/free-solid-svg-icons';

import { EditStatusIcon } from './EditStatus';
import SingleMedication from './SingleMedication';
import MedicationForm from './MedicationForm';

library.add(faEdit, faPrescriptionBottle);

const MedicalInformationContainer = styled.section`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, auto);
  border: grey solid 1px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const MedicationListContainer = styled.ul`
  display: grid;
  grid-row: 2;
  grid-column: 2 / span 4;
  list-style: none;
`;

export default function MedicalInformation({
  medicationList,
  onSingleMedicationSubmit
}) {
  return (
    <MedicalInformationContainer>
      <MedicalIcon icon="prescription-bottle" />
      <MedicationListContainer>
        {medicationList.map(singleMedication => (
          <SingleMedication singleMedication={singleMedication} />
        ))}
      </MedicationListContainer>
      <MedicationForm onSingleMedicationSubmit={onSingleMedicationSubmit} />
    </MedicalInformationContainer>
  );
}

/*

          <Input
            type="text"
            name="dosage"
            value={medicationElement.dosage}
            onChange={event =>
              submitMedicationChange('dosage', event, onMedicationChange)
            }
          />






<Input
            name="medicine"
            value={medicine}
            onChange={event =>
              onMedicationChange('morningMedicine', event, onMedicationChange)
            }
          />
          <Input name="dosage" value={dosage} />



 const { time } = medication;

  const [isMedicationEditable, setisMedicationEditable] = useState(false);

  
  function submitMedicationChange(name, event, onMedicationChange) {
    const newMedication = [{ ...medication, [name]: event.target.value }];
    onMedicationChange(newMedication);
  }





          {isMedicationEditable ? (
        <div>
          <select
            onChange={event =>
              submitMedicationChange('time', event, onMedicationChange)
            }
          >
            <option value="morning" name="Morgens">
              Morgens
            </option>
            <option value="midday">Mittags</option>
            <option value="evening">Abends</option>
            <option value="onDemand">Bei Bedarf</option>
          </select>
        </div>
      ) : (
        <div>{console.log(time)}</div>
      )}
      {isMedicationEditable ? (
        <EditStatusIcon
          icon="check-square"
          onClick={() => setisMedicationEditable(!isMedicationEditable)}
        />
      ) : (
        <EditStatusIcon
          icon="edit"
          onClick={() => setisMedicationEditable(!isMedicationEditable)}
        />
      )}
*/
