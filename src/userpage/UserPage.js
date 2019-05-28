import React from 'react';
import Input from '../components/Input';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';

export default function UserPage({ user, onUserChange }) {
  function onSubmit(event, onUserChange) {
    event.preventDefault();
    const newUser = event.target.user.value;
    onUserChange(newUser);
  }
  return (
    <>
      <Header>User</Header>
      <ContentContainer>
        <form onSubmit={event => onSubmit(event, onUserChange)}>
          <Input label="Username:" name="user" />
          <p>Du bist eingeloggt als {user}</p>
        </form>
      </ContentContainer>
    </>
  );
}
