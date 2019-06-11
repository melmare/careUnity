import React, { useState } from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/Label';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

const uid = require('uid');

const AddUserBtn = styled(FontAwesomeIcon)`
  background: skyblue;
`;
const UserBox = styled.span`
  background: ${props => props.color};
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;

  :last-child {
    background: skyblue;
    color: white;
    padding: 5px 10px;
  }
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
  function onClick(history) {
    history.push('/todo');
  }

  function handleLogoutBtnClick({}) {
    console.log('logout');
  }

  function handleCreateUserBtnClick(event, userGroup, onNewUserRegistration) {
    event.preventDefault();
    const newUser = {
      id: uid(),
      username: event.target.username.value,
      userGroupname: userGroup.name,
      usercolor: event.target.usercolor.value,
      role: 'member'
    };
    onNewUserRegistration(newUser);
    setIsFormHidden(true);
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
        <p>Hallo {user.username}</p>
        <div>Deine Familie besteht aus:</div>
        <ul>
          {userGroup.users.map(user => (
            <UserBox color={user.usercolor}>{user.username}</UserBox>
          ))}
          <UserBox onClick={() => setIsFormHidden(false)}>+</UserBox>
        </ul>
        <form
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
            Farbe:
            <input type="color" name="usercolor" />
          </label>
          <SubmitButton>Neuen User anlegen</SubmitButton>
        </form>

        <p>Deine Aufgaben:</p>
        {toDos
          .filter(toDo => toDo.personInCharge === user.username)
          .map(toDo => (
            <div onClick={() => onClick(history)}>
              <ToDo toDo={toDo} user={user} />
            </div>
          ))}
        <p>Deine letzten Einträge:</p>
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

/*

        <div>Deine Familie besteht aus:</div>
        {users.map(user => (
          <UserBox color={user.usercolor}>{user.username}</UserBox>
        ))}

        */
