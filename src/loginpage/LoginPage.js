import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;

const RegistrationBtnContainer = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 20px;
`;

export default function LoginPage({
  onNewUserGroup,
  currentUserGroup,
  userGroups,
  onLogin,
  history,
  onNewData
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
          <Button onClick={() => setPageStatus('registration')}>
            Registrieren
          </Button>
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
        <RegistrationBtnContainer>
          Deine Familie ist noch nicht bei careUnity registriert?
          <Button onClick={() => setPageStatus('registration')}>
            Registrieren
          </Button>
        </RegistrationBtnContainer>
      )}
      {pageStatus === 'registration' && (
        <RegistrationForm
          onNewData={onNewData}
          onNewUserGroup={onNewUserGroup}
          onLogin={onLogin}
          history={history}
          currentUserGroup={currentUserGroup}
        />
      )}
    </LoginPageContainer>
  );
}
