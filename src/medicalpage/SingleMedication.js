import React from 'react';
import styled from 'styled-components';

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

export default function SingleMedication({ singleMedication }) {
  const { time, medicine, dosage } = singleMedication;

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

  return (
    <SingleMedicationContainer>
      <TimeContainer>{getTimeIcon(time)}</TimeContainer>
      <MedicineContainer>{medicine}</MedicineContainer>
      <DosageContainer>{dosage}</DosageContainer>
    </SingleMedicationContainer>
  );
}
