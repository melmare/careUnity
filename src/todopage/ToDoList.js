import React from 'react';
import ToDo from './ToDo';
import styled from 'styled-components';

const StatusCategory = styled.div`
  margin: 20px 0;
`;

export default function ToDoList({ toDos, onDataChange, onDataDelete, user }) {
  return (
    <>
      <StatusCategory>Offene Aufgaben</StatusCategory>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'active')
          .map(toDo => (
            <ToDo
              key={toDo.title}
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
      <StatusCategory>In Bearbeitung</StatusCategory>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'inProgress')
          .map(toDo => (
            <ToDo
              key={toDo.title}
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
      <StatusCategory>Abgeschlossene Aufgaben</StatusCategory>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'complete')
          .map(toDo => (
            <ToDo
              key={toDo.title}
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
    </>
  );
}
