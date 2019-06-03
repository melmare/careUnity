import React, { useState } from 'react';
import Label from '../components/Label';
import Input from '../components/Input';
import MedicalIcon from './MedicalIcon';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faClinicMedical,
  faEdit,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { EditStatusIcon } from './EditStatus';

library.add(faEdit, faCheckSquare, faClinicMedical);

const LocationInformationContainer = styled.section`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  padding: 10px;
  border: grey solid 1px;
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const Output = styled.div``;

export default function LocationInformation({ location, onLocationChange }) {
  const { adress, phonenum, room } = location;
  const [isAdressEditable, setIsAdressEditable] = useState(false);
  const [isPhonenumEditable, setIsPhonenumEditable] = useState(false);
  const [isRoomEditable, setIsRoomEditable] = useState(false);

  function onAdressChange(name, event, onLocationChange) {
    const newLocation = { ...location, [name]: event.target.value };
    onLocationChange(newLocation);
  }

  return (
    <LocationInformationContainer>
      <MedicalIcon icon="clinic-medical" />

      <Label htmlFor="adress" label="Adresse" />
      {isAdressEditable ? (
        <Input
          onChange={event => onAdressChange('adress', event, onLocationChange)}
          name="adress"
          value={adress}
        />
      ) : (
        <Output>{adress}</Output>
      )}
      {isAdressEditable ? (
        <EditStatusIcon
          icon="check-square"
          onClick={() => setIsAdressEditable(!isAdressEditable)}
        />
      ) : (
        <EditStatusIcon
          icon="edit"
          onClick={() => setIsAdressEditable(!isAdressEditable)}
        />
      )}

      <Label htmlFor="phonenum" label="Telefon" />
      {isPhonenumEditable ? (
        <Input
          onChange={event =>
            onAdressChange('phonenum', event, onLocationChange)
          }
          name="phonenum"
          value={phonenum}
        />
      ) : (
        <Output>{phonenum}</Output>
      )}
      {isPhonenumEditable ? (
        <EditStatusIcon
          icon="check-square"
          onClick={() => setIsPhonenumEditable(!isPhonenumEditable)}
        />
      ) : (
        <EditStatusIcon
          icon="edit"
          onClick={() => setIsPhonenumEditable(!isPhonenumEditable)}
        />
      )}

      <Label htmlFor="room" label="Zimmer" />
      {isRoomEditable ? (
        <Input
          onChange={event => onAdressChange('room', event, onLocationChange)}
          name="room"
          value={room}
        />
      ) : (
        <Output>{room}</Output>
      )}
      {isRoomEditable ? (
        <EditStatusIcon
          icon="check-square"
          onClick={() => setIsRoomEditable(!isRoomEditable)}
        />
      ) : (
        <EditStatusIcon
          icon="edit"
          onClick={() => setIsRoomEditable(!isRoomEditable)}
        />
      )}
    </LocationInformationContainer>
  );
}
