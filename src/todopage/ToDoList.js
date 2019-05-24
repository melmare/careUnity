import React from 'react';
import ToDo from './ToDo';

export default function ToDoList({ toDos, onToDoStatusChange, onToDoDelete }) {
  return (
    <>
      <div>Offene Aufgaben</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'active')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
            />
          ))}
      <div>In Bearbeitung</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'inProgress')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
            />
          ))}
      <div>Abgeschlossene Aufgaben</div>
      {toDos &&
        toDos
          .filter(toDo => toDo.status === 'complete')
          .map(toDo => (
            <ToDo
              toDo={toDo}
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
            />
          ))}
    </>
  );
}
