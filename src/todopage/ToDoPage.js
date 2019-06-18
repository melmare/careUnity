import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
export default function ToDoPage({
  toDos,
  user,
  onNewData,
  onDataChange,
  onDataDelete
}) {
  return (
    <>
      <Header>
        <Headline>Aufgaben</Headline>
      </Header>
      <ContentContainer>
        <ToDoForm user={user} onNewData={onNewData} />
        <ToDoList
          toDos={toDos}
          user={user}
          onDataChange={onDataChange}
          onDataDelete={onDataDelete}
        />
      </ContentContainer>
    </>
  );
}
