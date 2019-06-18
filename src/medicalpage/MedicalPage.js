import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import LocationInformation from './LocationInformation';
import MedicalInformation from './MedicalInformation';
import MedicalComment from './MedicalComment';

export default function MedicalPage({
  location,
  onLocationChange,
  medicationList,
  onNewData,
  onDataDelete,
  onDataChange,
  medicalComments
}) {
  return (
    <>
      <Header>Informationen</Header>
      <ContentContainer>
        <LocationInformation
          location={location}
          onLocationChange={onLocationChange}
        />
        <MedicalInformation
          medicationList={medicationList}
          onNewData={onNewData}
          onDataDelete={onDataDelete}
          onDataChange={onDataChange}
        />
        <MedicalComment
          onNewData={onNewData}
          medicalComments={medicalComments}
        />
      </ContentContainer>
    </>
  );
}
