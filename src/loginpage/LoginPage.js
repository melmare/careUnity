import React, { useState } from 'react';
import styled from 'styled-components';
import Headline from '../components/Headline';
import Input from '../components/Input';
import Label from '../components/Label';
import SubmitButton from '../components/SubmitButton';

const uid = require('uid');
const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserGroupRegistrationForm = styled.form``;

const AdminRegistrationForm = styled.form``;

const UserRegistrationForm = styled.form``;

const LoginForm = styled.form``;

const UserBox = styled.span`
  background: skyblue;
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;
`;

export default function LoginPage({
  onNewUserGroup,
  onNewUser,
  user,
  userGroup,
  onLogin,
  onUserLogin,
  history
}) {
  const [pageStatus, setPageStatus] = useState('welcome');

  function handleUserGroupRegistrationSubmit(event, onNewUserGroup) {
    event.preventDefault();
    const newUserGroup = {
      name: event.target.userGroupName.value,
      password: event.target.userGroupPassword.value,
      users: []
    };
    onNewUserGroup(newUserGroup);
    setPageStatus('registration-step2');
  }

  function handleAdminUserRegistrationSubmit(event, onNewUser) {
    event.preventDefault();
    const newAdminUser = {
      id: uid(),
      username: event.target.adminname.value,
      usercolor: event.target.usercolor.value,
      role: 'admin'
    };
    onNewUser(newAdminUser);
    setPageStatus('registration-step3');
  }

  function handleLoginFormSubmit(event, userGroup, onUserLogin, history) {
    event.preventDefault();
    if (!userGroup) {
      setPageStatus('errorWhileLoggingIn');
      return;
    }
    const index = userGroup.users
      .map(user => user.username)
      .indexOf(event.target.loginusername.value);
    const pendingUser = userGroup.users[index];

    if (!pendingUser) {
      setPageStatus('errorWhileLogginIn');
      return;
    }
    onUserLogin(pendingUser, history);

    return <div>Du bist noch nicht registriert!</div>;
  }

  return (
    <LoginPageContainer>
      <h2>Willkommen bei careUnity!</h2>

      {pageStatus === 'errorWhileLoggingIn' && (
        <div>
          Etwas ist schiefgelaufen. Versuche es noch einmal. Falls du noch nicht
          registriert bist, kannst du dies hier tun.
        </div>
      )}
      <LoginForm
        onSubmit={event =>
          handleLoginFormSubmit(event, userGroup, onUserLogin, history)
        }
      >
        <label>
          Gib deinen Namen an:
          <Input name="loginusername" />
        </label>
        <SubmitButton>Login</SubmitButton>
      </LoginForm>
      <p>Deine Familie ist noch nicht bei careUnity registriert? </p>
      <SubmitButton onClick={() => setPageStatus('registration-step1')}>
        Registrieren
      </SubmitButton>

      {pageStatus === 'registration-step1' && (
        <UserGroupRegistrationForm
          hidden={userGroup}
          onSubmit={event =>
            handleUserGroupRegistrationSubmit(event, onNewUserGroup)
          }
        >
          <label>
            Gib deinen Familiennamen an:
            <Input name="userGroupName" required />
          </label>
          <label>
            Gib dein Familienkennwort an:
            <Input name="userGroupPassword" required />
          </label>
          <SubmitButton>Neue Familie anlegen</SubmitButton>
        </UserGroupRegistrationForm>
      )}

      {pageStatus === 'registration-step2' && (
        <AdminRegistrationForm
          onSubmit={event =>
            handleAdminUserRegistrationSubmit(event, onNewUser)
          }
        >
          <Label htmlFor="adminname" label="Gib deinen Namen an:" />
          <Input name="adminname" />
          <Label htmlFor="usercolor" label="Wähle deine Farbe aus:" />
          <input
            type="color"
            name="usercolor"
            defaultValue="#f6b73c"
            required
          />
        </AdminRegistrationForm>
      )}

      {pageStatus === 'registration-step3' && (
        <div>
          <h3>Hallo {user.username}</h3>
          <p>
            Die Nutzung von careUnity kann beginnen. Als Familien-Administrator
            kannst du im User-Bereich neue Familienmitglieder hinzufügen. Viel
            Spaß!
          </p>
          <SubmitButton onClick={() => onLogin(history)}>START</SubmitButton>
        </div>
      )}
    </LoginPageContainer>
  );
}

/*

 function handleUserRegistration(event, onNewUser) {
    event.preventDefault();
    const newUser = {
      id: uid(),
      username: event.target.username.value,
      role: 'member'
    };
    onNewUser(newUser);
  }

  */
