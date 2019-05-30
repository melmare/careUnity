import React from 'react';
import Header from '../../components/Header';
import ContentContainer from '../../components/ContentContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faClinicMedical,
  faPrescriptionBottle,
  faCommentMedical
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Input from '../../components/Input';
import Label from '../../components/Label';

library.add(faClinicMedical, faPrescriptionBottle, faCommentMedical);

const LocationInformationContainer = styled.section`
  display: grid;
  border: grey solid 1px;
  margin-bottom: 20px;
  padding: 10px;
`;

const MedicationInformationContainer = styled.section`
  border: grey solid 1px;
  margin-bottom: 20px;
  padding: 10px;
`;

const MedicalCommentContainer = styled.section`
  border: grey solid 1px;
  margin-bottom: 20px;
  padding: 10px;
`;
const MedicalIcon = styled(FontAwesomeIcon)`
  color: skyblue;
  font-size: 2.5rem;
`;

export function MedicalPage() {
  return (
    <>
      <Header>Informationen</Header>
      <ContentContainer>
        <LocationInformationContainer>
          <MedicalIcon icon="clinic-medical" />
          <Label htmlFor="adress" label="Adresse" />
          <Input name="adress" />
          <Label htmlFor="phonenum" label="Telefon" />
          <Input name="phonenum" />
          <Label htmlFor="room" label="Zimmer" />
          <Input name="room" />
        </LocationInformationContainer>
        <MedicationInformationContainer>
          <MedicalIcon icon="prescription-bottle" />
        </MedicationInformationContainer>
        <MedicalCommentContainer>
          <MedicalIcon icon="comment-medical" />
        </MedicalCommentContainer>
      </ContentContainer>
    </>
  );
}
