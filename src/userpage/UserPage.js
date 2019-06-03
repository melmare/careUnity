import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';

export default function UserPage({ user, onUserChange }) {
  function onSubmit(event, onUserChange) {
    event.preventDefault();
    const newUser = {
      username: event.target.username.value
    };
    onUserChange(newUser);
    console.log(newUser);
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
        <form onSubmit={event => onSubmit(event, onUserChange)}>
          <label>Gib deinen Namen an:</label>
          <Input label="Username:" name="username" />
          <p>Du bist eingeloggt als {user.username}</p>
        </form>
      </ContentContainer>
    </>
  );
}
