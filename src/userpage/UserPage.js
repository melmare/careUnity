import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/Label';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';
import styled from 'styled-components';
import SubmitButton from '../components/SubmitButton';

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
  toDos,
  newsList,
  history,
  userGroup,
  onLogout
}) {
  function onClick(history) {
    history.push('/todo');
  }

  function handleLogoutBtnClick({}) {
    console.log('logout');
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
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
