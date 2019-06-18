import React from 'react';
import ToDo from './ToDo';

export default function ToDoList({ toDos, onDataChange, onDataDelete, user }) {
  return (
    <>
      <div>Offene Aufgaben</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'active')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
      <div>In Bearbeitung</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'inProgress')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
      <div>Abgeschlossene Aufgaben</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'complete')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              user={user}
              onDataChange={onDataChange}
              onDataDelete={onDataDelete}
            />
          ))}
    </>
  );
}
