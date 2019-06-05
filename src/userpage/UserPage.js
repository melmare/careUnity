import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/Label';

export default function UserPage({ user, onUserChange }) {
  function onSubmit(event, onUserChange) {
    event.preventDefault();
    const newUser = {
      username: event.target.username.value,
      usercolor: event.target.usercolor.value
    };
    onUserChange(newUser);
    console.log(newUser);
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
      </ContentContainer>
    </>
  );
}
