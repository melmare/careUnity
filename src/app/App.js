import React, { useState } from 'react';
import Entry from '../newspage/Entry';
import GlobalStyles from '../components/GlobalStyles';
import EntryForm from '../newspage/EntryForm';

function App() {
  const [entry, setEntry] = useState('');

  function handleFormSubmit(newEntry) {
    setEntry(newEntry);
  }
  return (
    <>
      <GlobalStyles />
      <EntryForm onFormSubmit={handleFormSubmit} />
      {entry && (
        <Entry
          title={entry.title}
          author={entry.author}
          description={entry.description}
        />
      )}
    </>
  );
}

export default App;
