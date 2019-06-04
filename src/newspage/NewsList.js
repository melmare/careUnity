import React from 'react';
import Entry from './Entry';

export default function NewsList({ newsList, onNewsDelete }) {
  return (
    <>
      {newsList.map(entry => (
        <Entry key={entry._id} entry={entry} onNewsDelete={onNewsDelete} />
      ))}
    </>
  );
}
