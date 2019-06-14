import React, { useState } from 'react';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;

export default function LoginPage({
  onNewUserGroup,
  currentUserGroup,
  userGroups,
  onLogin,
  history,
  onNewUserRegistration
}) {
  const [pageStatus, setPageStatus] = useState('welcome');

  return (
    <LoginPageContainer>
      <h2>Willkommen bei careUnity!</h2>
      {pageStatus === 'errorWrongPassword' && (
        <>
          <div>
            Du hast ein falsches Kennwort angegeben. Versuche es noch einmal.
          </div>
          <LoginForm
            onIncorrectLoginData={errortype => setPageStatus(errortype)}
            userGroups={userGroups}
            onLogin={onLogin}
            history={history}
          />
        </>
      )}
      {pageStatus === 'errorWrongEmail' && (
        <div>
          Du hast eine falsche Email-Adresse angegeben. Versuche es noch einmal.
          <LoginForm
            onIncorrectLoginData={errortype => setPageStatus(errortype)}
            userGroups={userGroups}
            onLogin={onLogin}
            history={history}
          />
          Deine Familie ist noch nicht bei careUnity registriert?
          <SubmitButton onClick={() => setPageStatus('registration-step1')}>
            Registrieren
          </SubmitButton>
        </div>
      )}
      {pageStatus === 'welcome' && (
        <LoginForm
          onIncorrectLoginData={errortype => setPageStatus(errortype)}
          userGroups={userGroups}
          onLogin={onLogin}
          history={history}
        />
      )}
      {pageStatus === 'welcome' && (
        <>
          <p>Deine Familie ist noch nicht bei careUnity registriert? </p>
          <SubmitButton onClick={() => setPageStatus('registration-step1')}>
            Registrieren
          </SubmitButton>
        </>
      )}
      <RegistrationForm
        onNewUserRegistration={onNewUserRegistration}
        onNewUserGroup={onNewUserGroup}
        onLogin={onLogin}
        history={history}
        currentUserGroup={currentUserGroup}
      />
    </LoginPageContainer>
  );
}
