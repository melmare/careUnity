import React from 'react';
import Entry from './Entry';

export default function NewsList({
  user,
  newsList,
  onNewsDelete,
  onSaveChangedNewsEntry
}) {
  return (
    <>
      {newsList.map(entry => (
        <Entry
          key={entry.id}
          user={user}
          entry={entry}
          onNewsDelete={onNewsDelete}
          onSaveChangedNewsEntry={onSaveChangedNewsEntry}
        />
      ))}
    </>
  );
}
