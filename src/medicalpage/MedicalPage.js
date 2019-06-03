import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import LocationInformation from './LocationInformation';
import MedicalInformation from './MedicalInformation';

export default function MedicalPage({ location, onLocationChange }) {
  return (
    <>
      <Header>Informationen</Header>
      <ContentContainer>
        <LocationInformation
          location={location}
          onLocationChange={onLocationChange}
        />
        <MedicalInformation />
      </ContentContainer>
    </>
  );
}
