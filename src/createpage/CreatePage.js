import React from 'react';
import NewsForm from './NewsForm';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';

export default function CreatePage({ history, user, onNewData, newsList }) {
  function handleEntrySubmit(newEntry) {
    onNewData('newsList', newEntry, history);
  }
  return (
    <>
      <Header>
        <Headline>Eintrag erstellen</Headline>
      </Header>
      <ContentContainer>
        <NewsForm
          user={user}
          onNewsCreation={handleEntrySubmit}
          newsList={newsList}
        />
      </ContentContainer>
    </>
  );
}
