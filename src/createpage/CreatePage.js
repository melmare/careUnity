import React from 'react';
import NewsForm from './NewsForm';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';

const uid = require('uid');

export default function CreatePage({ onSaveNewEntry, history }) {
  function handleEntrySubmit(newEntry) {
    console.log('auf createPage angekommen');
    onSaveNewEntry(newEntry, history);
  }
  return (
    <>
      <Header>
        <Headline>Eintrag erstellen</Headline>
      </Header>
      <ContentContainer>
        <NewsForm onNewsCreation={handleEntrySubmit} />
      </ContentContainer>
    </>
  );
}
