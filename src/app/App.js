import React from 'react';
import Entry from '../blog/Entry';
import mockEntry from '../mockdata';
import GlobalStyles from '../components/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Entry
        title={mockEntry.title}
        author={mockEntry.author}
        text={mockEntry.text}
      />
    </>
  );
}

export default App;
