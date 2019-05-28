import React from 'react';
import ToDo from './ToDo';

export default function ToDoList({
  toDos,
  onToDoStatusChange,
  onToDoDelete,
  user,
  onToDoDistribution
}) {
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
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
              onToDoDistribution={onToDoDistribution}
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
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
              onToDoDistribution={onToDoDistribution}
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
              onToDoStatusChange={onToDoStatusChange}
              onToDoDelete={onToDoDelete}
              onToDoDistribution={onToDoDistribution}
            />
          ))}
    </>
  );
}
