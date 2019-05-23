import React from 'react';
import Form from './Form';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Headline from '../components/Headline';

export default function CreatePage({ onFormSubmit, history }) {
  return (
    <>
      <Header>
        <Headline>Create new Entry</Headline>
      </Header>
      <ContentContainer>
        <Form onFormSubmit={onFormSubmit} history={history} />
      </ContentContainer>
    </>
  );
}
