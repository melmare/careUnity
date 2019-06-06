import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/Label';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';
import styled from 'styled-components';

const uid = require('uid');

const UserBox = styled.span`
  background: ${props => props.color};
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;
`;
export default function UserPage({
  user,
  onUserChange,
  toDos,
  newsList,
  history,
  userGroup
}) {
  function onSubmit(event, onUserChange, user, userGroup) {
    event.preventDefault();
    console.log(user.id);
    const newUser = {
      id: uid(),
      username: event.target.username.value,
      usercolor: event.target.usercolor.value
    };
    if (userGroup.map(user => user.username).includes(newUser.username)) {
      return;
    }
    onUserChange(newUser);
  }

  function onClick(history) {
    history.push('/todo');
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
        <div>Deine Familie besteht aus:</div>
        {userGroup.map(user => (
          <UserBox color={user.usercolor}>{user.username}</UserBox>
        ))}
        <form
          onSubmit={event => onSubmit(event, onUserChange, user, userGroup)}
        >
          <Label htmlFor="username" label="Gib deinen Namen an:" />
          <Input name="username" />
          {!user.usercolor && (
            <Label
              htmlFor="usercolor"
              label="Wähle deine Farbe aus:"
              hidden={user.usercolor}
            />
          )}

          <input
            type="color"
            name="usercolor"
            defaultValue="#f6b73c"
            required
            hidden={user.usercolor}
          />
        </form>
        <p>Du bist eingeloggt als {user.username}</p>
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
      </ContentContainer>
    </>
  );
}
