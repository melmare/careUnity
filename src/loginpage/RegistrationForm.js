import React from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Label from '../components/Label';
import ColorInput from '../components/ColorInput';
import SubmitButton from '../components/SubmitButton';

const uid = require('uid');

const UserGroupRegistrationForm = styled.form``;

const AdminUserRegistrationForm = styled.form``;

export default function RegistrationForm({
  onNewUserGroup,
  onLogin,
  history,
  currentUserGroup,
  onNewUserRegistration
}) {
  async function handleRegistration(event) {
    event.preventDefault();
    const newUserGroup = {
      name: event.target.userGroupName.value,
      password: event.target.userGroupPassword.value,
      users: [],
      news: []
    };
    onNewUserGroup(newUserGroup);
  }

  function handleAdminUserRegistration(event) {
    event.preventDefault();
    const newAdminUser = {
      id: uid(),
      username: event.target.adminname.value,
      userGroupname: currentUserGroup.name,
      userGroupId: currentUserGroup._id,
      email: event.target.email.value,
      usercolor: event.target.usercolor.value,
      role: 'admin'
    };
    onNewUserRegistration(newAdminUser);
    onLogin(newAdminUser, currentUserGroup, history);
  }

  return (
    <>
      {currentUserGroup ? (
        <AdminUserRegistrationForm
          onSubmit={event => handleAdminUserRegistration(event)}
        >
          <Label htmlFor="adminname" label="Gib deinen Namen an:" />
          <Input name="adminname" required />
          <Label htmlFor="email" label="Gib deine Email-Adresse an:" />
          <Input name="email" required />
          <Label htmlFor="usercolor" label="Wähle deine Farbe aus:" />
          <ColorInput name="usercolor" currentUserGroup={currentUserGroup} />
          <SubmitButton>Neuen User registrieren</SubmitButton>
        </AdminUserRegistrationForm>
      ) : (
        <UserGroupRegistrationForm
          onSubmit={event => handleRegistration(event)}
        >
          <Label htmlFor="userGroupName" label="Gib deinen Familiennamen an:" />
          <Input name="userGroupName" required />
          <Label
            htmlFor="userGroupPassword"
            label="Gib dein Familienkennwort an:"
          />
          <Input name="userGroupPassword" required />
          <SubmitButton>Neue Familie anlegen</SubmitButton>
        </UserGroupRegistrationForm>
      )}
    </>
  );
}
