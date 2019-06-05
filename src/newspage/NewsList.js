import React from 'react';
import Entry from './Entry';

export default function NewsList({
  newsList,
  onNewsDelete,
  onSaveChangedNewsEntry
}) {
  return (
    <>
      {newsList.map(entry => (
        <Entry
          key={entry.id}
          entry={entry}
          onNewsDelete={onNewsDelete}
          onSaveChangedNewsEntry={onSaveChangedNewsEntry}
        />
      ))}
    </>
  );
}
