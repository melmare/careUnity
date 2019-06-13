import React from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Label from '../components/Label';
import ColorInput from '../components/ColorInput';
import SubmitButton from '../components/SubmitButton';

const uid = require('uid');

const StyledRegistrationForm = styled.form``;

export default function RegistrationForm({
  onNewUserGroup,
  onLogin,
  history,
  currentUserGroup
}) {
  function handleRegistration(event) {
    event.preventDefault();
    const userGroupId = uid();
    const newAdminUser = {
      id: uid(),
      username: event.target.adminname.value,
      userGroupname: event.target.userGroupName.value,
      userGroupId,
      email: event.target.email.value,
      usercolor: event.target.usercolor.value,
      role: 'admin'
    };
    const newUserGroup = {
      name: event.target.userGroupName.value,
      password: event.target.userGroupPassword.value,
      id: userGroupId,
      users: [newAdminUser]
    };
    onNewUserGroup(newUserGroup);
    onLogin(newAdminUser, newUserGroup, history);
  }

  return (
    <StyledRegistrationForm onSubmit={event => handleRegistration(event)}>
      <Label htmlFor="adminname" label="Gib deinen Namen an:" />
      <Input name="adminname" required />
      <Label htmlFor="email" label="Gib deine Email-Adresse an:" />
      <Input name="email" required />
      <Label htmlFor="usercolor" label="Wähle deine Farbe aus:" />
      <ColorInput name="usercolor" currentUserGroup={currentUserGroup} />
      <Label htmlFor="userGroupName" label="Gib deinen Familiennamen an:" />
      <Input name="userGroupName" required />
      <Label
        htmlFor="userGroupPassword"
        label="Gib dein Familienkennwort an:"
      />
      <Input name="userGroupPassword" required />
      <SubmitButton>Neue Familie anlegen</SubmitButton>
    </StyledRegistrationForm>
  );
}
