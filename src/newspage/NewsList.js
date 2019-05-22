import React from 'react';
import Entry from './Entry';

export default function NewsList({ newsList }) {
  return (
    <div>
      {newsList.map(entry => (
        <Entry
          title={entry.title}
          author={entry.author}
          description={entry.description}
        />
      ))}
    </div>
  );
}
