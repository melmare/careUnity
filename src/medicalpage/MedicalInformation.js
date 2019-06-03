import React, { useState } from 'react';
import styled from 'styled-components';
import MedicalIcon from './MedicalIcon';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faPrescriptionBottle
} from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';

library.add(faEdit, faPrescriptionBottle);

const MedicalInformationContainer = styled.section`
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: auto auto auto auto auto;
  border: grey solid 1px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export default function MedicalInformation({ medicine }) {
  const [isMorningMedicineEditable, setisMorningMedicineEditable] = useState(
    false
  );

  return (
    <MedicalInformationContainer>
      <MedicalIcon icon="prescription-bottle" />
      {isMorningMedicineEditable ? <Input /> : <p>Output rendern</p>}
    </MedicalInformationContainer>
  );
}
