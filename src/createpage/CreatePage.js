import React from 'react';
import NewsForm from './NewsForm';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';

export default function CreatePage({ onFormSubmit, history }) {
  return (
    <>
      <Header>
        <Headline>Eintrag erstellen</Headline>
      </Header>
      <ContentContainer>
        <NewsForm onFormSubmit={onFormSubmit} history={history} />
      </ContentContainer>
    </>
  );
}
