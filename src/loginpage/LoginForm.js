import React from 'react';
import styled from 'styled-components';
import Label from '../components/Label';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { getTotalUserGroups } from '../services';

const StyledLoginForm = styled.form``;

export default function LoginForm({
  onLogin,
  history,
  onIncorrectLoginData,
  userGroups
}) {
  async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const loginemail = event.target.loginemail.value;
    const loginpassword = event.target.loginpassword.value;
    const allUserGroups = await getTotalUserGroups();
    const totalUsers = allUserGroups.map(userGroup => userGroup.users);
    const totalUsersList = new Array().concat(...totalUsers);

    try {
      const foundUser = totalUsersList.find(user => user.email === loginemail);
      const foundUserGroup = allUserGroups.find(
        userGroup => userGroup._id === foundUser.userGroupId
      );
      if (foundUserGroup.password === loginpassword) {
        onLogin(foundUser, foundUserGroup, history);
      } else {
        onIncorrectLoginData('errorWrongPassword');
      }
    } catch {
      onIncorrectLoginData('errorWrongEmail');
    }
  }

  return (
    <StyledLoginForm onSubmit={event => handleLoginFormSubmit(event)}>
      <Label htmlFor="loginemail" label="Gib deine Email-Adresse an:" />
      <Input name="loginemail" required />

      <Label htmlFor="loginpassword" label="Gib dein Familienpasswort an:" />
      <Input name="loginpassword" required />

      <SubmitButton>Login</SubmitButton>
    </StyledLoginForm>
  );
}
