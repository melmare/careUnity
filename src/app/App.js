import React, { useState, useEffect } from 'react';
import NewsList from '../newspage/NewsList';
import GlobalStyles from '../components/GlobalStyles';
import Form from '../newspage/Form';
import { setLocalData, getLocalData } from '../services';

function App() {
  const [newsList, setNewsList] = useState(getLocalData('news') || []);

  function handleFormSubmit(newEntry) {
    setNewsList([newEntry, ...newsList]);
  }

  useEffect(() => {
    setLocalData('news', newsList);
  });

  return (
    <>
      <GlobalStyles />
      <Form onFormSubmit={handleFormSubmit} />
      <NewsList newsList={newsList} />
    </>
  );
}

export default App;
