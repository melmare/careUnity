import React from 'react';
import Entry from './Entry';

export default function NewsList({ newsList, onNewsDelete, onNewsChange }) {
  return (
    <>
      {newsList.map(entry => (
        <Entry
          key={entry.id}
          entry={entry}
          onNewsDelete={onNewsDelete}
          onNewsChange={onNewsChange}
        />
      ))}
    </>
  );
}
