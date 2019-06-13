import React, { useState } from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
import ColorInput from '../components/ColorInput';

const uid = require('uid');

const UserBox = styled.span`
  background: ${props => props.color};
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 0 5px 1px rgba(221, 221, 221, 1);

  :last-child {
    background: skyblue;
    color: white;
    padding: 5px 10px;
    font-weight: bold;
  }
`;

const CreateUserForm = styled.form``;

const UserPageHeadline = styled.h3`
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: normal;
`;

const UserList = styled.ul`
  margin: 15px 0 30px 0;
`;

const OwnToDoHeadline = styled.div`
  margin: 20px 0;
  font-size: 22px;
  font-weight: normal;
`;

const OwnToDoContainer = styled.div`
  margin: 15px 0 40px 0;
`;

export default function UserPage({
  user,
  toDos,
  newsList,
  history,
  userGroup,
  onLogout,
  onNewUserRegistration
}) {
  const [isFormHidden, setIsFormHidden] = useState(true);

  function handleCreateUserBtnClick(event, userGroup, onNewUserRegistration) {
    event.preventDefault();
    const newUser = {
      id: uid(),
      username: event.target.username.value,
      userGroupname: userGroup.name,
      userGroupId: userGroup.id,
      email: event.target.email.value,
      usercolor: event.target.usercolor.value,
      role: 'member'
    };
    onNewUserRegistration(newUser);
    setIsFormHidden(true);
  }
  return (
    <>
      <Header>careUnity</Header>
      <ContentContainer>
        <UserPageHeadline>Deine Familie besteht aus:</UserPageHeadline>
        <UserList>
          {userGroup.users.map(user => (
            <UserBox key={user.username} color={user.usercolor}>
              {user.username}
            </UserBox>
          ))}
          <UserBox onClick={() => setIsFormHidden(false)}>+</UserBox>
        </UserList>
        <CreateUserForm
          hidden={isFormHidden}
          onSubmit={event =>
            handleCreateUserBtnClick(event, userGroup, onNewUserRegistration)
          }
        >
          <label>
            Name:
            <Input name="username" />
          </label>
          <label>
            Email:
            <Input name="email" />
          </label>
          <label>Farbe:</label>
          <ColorInput userGroup={userGroup} name="usercolor" />
          <SubmitButton>Neuen User anlegen</SubmitButton>
        </CreateUserForm>

        <OwnToDoHeadline>Deine Aufgaben:</OwnToDoHeadline>
        {toDos
          .filter(toDo => toDo.personInCharge === user.username)
          .map(toDo => (
            <OwnToDoContainer onClick={() => history.push('/todo')}>
              <ToDo toDo={toDo} user={user} />
            </OwnToDoContainer>
          ))}
        <UserPageHeadline>Deine letzten Einträge:</UserPageHeadline>
        {newsList
          .filter(entry => entry.author === user.username)
          .map(entry => (
            <Entry key={entry.id} user={user} entry={entry} />
          ))}
        <SubmitButton onClick={() => onLogout()}>Logout</SubmitButton>
      </ContentContainer>
    </>
  );
}
