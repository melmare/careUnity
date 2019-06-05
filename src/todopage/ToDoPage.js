import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
export default function ToDoPage({
  toDos,
  user,
  onToDoSubmit,
  onToDoStatusChange,
  onToDoDelete,
  onToDoDistribution
}) {
  return (
    <>
      <Header>
        <Headline>Aufgaben</Headline>
      </Header>
      <ContentContainer>
        <ToDoForm user={user} onToDoSubmit={onToDoSubmit} />
        <ToDoList
          toDos={toDos}
          user={user}
          onToDoStatusChange={onToDoStatusChange}
          onToDoDelete={onToDoDelete}
          onToDoDistribution={onToDoDistribution}
        />
      </ContentContainer>
    </>
  );
}
