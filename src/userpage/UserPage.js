import React, { useState } from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';
import styled from 'styled-components';
import Button from '../components/Button';
import ColorInput from '../components/ColorInput';

const uid = require('uid');

const UserBox = styled.span`
  background: ${props => props.color};
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgb(221, 221, 221);
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;

  :last-child {
    background: skyblue;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
`;

const CreateUserForm = styled.form``;

const FormLabel = styled.label`
  margin-bottom: 5px;
`;

const UserPageHeadline = styled.h3`
  font-size: 22px;
  font-weight: normal;
  margin: 0 0 20px 0;
`;

const UserList = styled.ul`
  margin: 15px 0 30px;
`;

const OwnToDoHeadline = styled.h3`
  font-size: 22px;
  font-weight: normal;
  margin: 20px 0;
`;

const OwnToDoContainer = styled.div`
  margin: 15px 0 40px;
`;

export default function UserPage({
  user,
  toDos,
  newsList,
  history,
  currentUserGroup,
  onLogout,
  onNewData
}) {
  const [isFormHidden, setIsFormHidden] = useState(true);

  function handleCreateUserBtnClick(event) {
    event.preventDefault();
    const newUser = {
      id: uid(),
      username: event.target.username.value,
      userGroupname: currentUserGroup.name,
      userGroupId: currentUserGroup._id,
      email: event.target.email.value,
      usercolor: event.target.usercolor.value,
      role: 'member'
    };
    onNewData('users', newUser);
    event.target.username.value = '';
    event.target.email.value = '';
    event.target.usercolor.value = null;
    setIsFormHidden(true);
  }
  return (
    <>
      <Header>{user.username}</Header>
      <ContentContainer>
        <UserPageHeadline>Deine Familie besteht aus:</UserPageHeadline>
        <UserList>
          {currentUserGroup.users.map(user => (
            <UserBox key={user.username} color={user.usercolor}>
              {user.username}
            </UserBox>
          ))}
          <UserBox onClick={() => setIsFormHidden(false)}>+</UserBox>
        </UserList>
        <CreateUserForm
          hidden={isFormHidden}
          onSubmit={event => handleCreateUserBtnClick(event)}
        >
          <FormLabel>
            Name:
            <Input name="username" />
          </FormLabel>
          <FormLabel>
            Email:
            <Input name="email" />
          </FormLabel>
          <FormLabel>Farbe:</FormLabel>
          <ColorInput currentUserGroup={currentUserGroup} name="usercolor" />
          <Button>Neuen User anlegen</Button>
          <Button onClick={() => setIsFormHidden(true)}>Abbrechen</Button>
        </CreateUserForm>
        <OwnToDoHeadline>Deine Aufgaben:</OwnToDoHeadline>
        {toDos &&
          toDos
            .filter(toDo => toDo.personInCharge === user.username)
            .map(toDo => (
              <OwnToDoContainer
                key={toDo.title}
                onClick={() => history.push('/todo')}
              >
                <ToDo toDo={toDo} user={user} />
              </OwnToDoContainer>
            ))}
        <UserPageHeadline>Deine letzten Einträge:</UserPageHeadline>
        {newsList &&
          newsList
            .filter(entry => entry.author === user.username)
            .map(entry => <Entry key={entry.id} user={user} entry={entry} />)}
        <Button onClick={() => onLogout()}>Logout</Button>
      </ContentContainer>
    </>
  );
}
