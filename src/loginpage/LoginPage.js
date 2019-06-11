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
  margin: 40px;
`;

const RegistrationForm = styled.form``;

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
  user,
  userGroup,
  onLogin,
  onUserLogin,
  history
}) {
  const [pageStatus, setPageStatus] = useState('welcome');

  function handleRegistration(event, onNewUserGroup, onUserLogin, history) {
    event.preventDefault();
    const newAdminUser = {
      id: uid(),
      username: event.target.adminname.value,
      userGroupname: event.target.userGroupName.value,
      usercolor: event.target.usercolor.value,
      role: 'admin'
    };
    const newUserGroup = {
      name: event.target.userGroupName.value,
      password: event.target.userGroupPassword.value,
      users: [newAdminUser]
    };
    onNewUserGroup(newUserGroup);
    onUserLogin(newAdminUser, history);
  }

  function handleLoginFormSubmit(event, userGroup, onUserLogin, history) {
    event.preventDefault();

    if (
      !userGroup ||
      userGroup.name !== event.target.loginusergroupname.value
    ) {
      setPageStatus('errorWrongUserGroupname');
      return;
    } else if (userGroup.password !== event.target.loginpassword.value) {
      setPageStatus('errorWrongPassword');
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

      {pageStatus === 'errorWrongUserGroupname' && (
        <div>
          Etwas ist schiefgelaufen. Versuche es noch einmal. Falls du noch nicht
          registriert bist, kannst du dies hier tun.
        </div>
      )}
      {pageStatus === 'errorWrongPassword' && (
        <div>
          Du hast den falschen Familiennamen oder ein falsches Kennwort
          angegeben.Versuche es noch einmal.
        </div>
      )}

      {pageStatus === 'welcome' && (
        <LoginForm
          onSubmit={event =>
            handleLoginFormSubmit(event, userGroup, onUserLogin, history)
          }
        >
          <label>
            Gib deinen Namen an:
            <Input name="loginusername" required />
          </label>
          <label>
            Gib deinen Familiennamen an:
            <Input name="loginusergroupname" required />
          </label>
          <label>
            Gib dein Passwort an:
            <Input name="loginpassword" required />
          </label>
          <SubmitButton>Login</SubmitButton>
        </LoginForm>
      )}

      {pageStatus === 'welcome' && (
        <>
          <p>Deine Familie ist noch nicht bei careUnity registriert? </p>
          <SubmitButton onClick={() => setPageStatus('registration-step1')}>
            Registrieren
          </SubmitButton>
        </>
      )}
      {pageStatus === 'registration-step1' && (
        <RegistrationForm
          onSubmit={event =>
            handleRegistration(event, onNewUserGroup, onUserLogin, history)
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

          <Label htmlFor="adminname" label="Gib deinen Namen an:" />
          <Input name="adminname" />
          <Label htmlFor="usercolor" label="Wähle deine Farbe aus:" />
          <input
            type="color"
            name="usercolor"
            defaultValue="#f6b73c"
            required
          />
          <SubmitButton>Neue Familie anlegen</SubmitButton>
        </RegistrationForm>
      )}

      {pageStatus === 'registration-step2' && (
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
