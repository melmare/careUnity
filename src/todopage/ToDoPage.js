import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
export default function ToDoPage({
  toDos,
  onToDoSubmit,
  onToDoStatusChange,
  onToDoDelete
}) {
  return (
    <>
      <Header>
        <Headline>Aufgaben</Headline>
      </Header>
      <ContentContainer>
        <ToDoForm onToDoSubmit={onToDoSubmit} />
        <ToDoList
          toDos={toDos}
          onToDoStatusChange={onToDoStatusChange}
          onToDoDelete={onToDoDelete}
        />
      </ContentContainer>
    </>
  );
}
