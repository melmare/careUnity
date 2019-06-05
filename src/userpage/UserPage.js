import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/Label';
import ToDo from '../todopage/ToDo';
import Entry from '../newspage/Entry';

export default function UserPage({
  user,
  onUserChange,
  toDos,
  newsList,
  history
}) {
  function onSubmit(event, onUserChange) {
    event.preventDefault();
    const newUser = {
      username: event.target.username.value,
      usercolor: event.target.usercolor.value
    };
    onUserChange(newUser);
  }

  function onClick(history) {
    history.push('/todo');
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
        <form onSubmit={event => onSubmit(event, onUserChange)}>
          <Label htmlFor="username" label="Gib deinen Namen an:" />
          <Input name="username" />
          <Label htmlFor="usercolor" label="Wähle deine Farbe aus:" />
          <input type="color" name="usercolor" />
          <p>Du bist eingeloggt als {user.username}</p>
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
      </ContentContainer>
    </>
  );
}
