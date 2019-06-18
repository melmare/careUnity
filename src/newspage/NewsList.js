import React from 'react';
import Entry from './Entry';

export default function NewsList({
  user,
  newsList,
  onDataDelete,
  onDataChange
}) {
  return (
    <>
      {newsList ? (
        newsList.map(entry => (
          <Entry
            key={entry.id}
            user={user}
            entry={entry}
            onDataDelete={onDataDelete}
            onDataChange={onDataChange}
          />
        ))
      ) : (
        <p>Es wurden noch keine Einträge angelegt.</p>
      )}
    </>
  );
}
