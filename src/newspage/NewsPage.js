import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import NewsList from './NewsList';
import Icon from '../components/NavIcon';
import ContentContainer from '../components/ContentContainer';
import HeaderButton from '../components/HeaderButton';
import Headline from '../components/Headline';

library.add(faPlus);

export default function NewsPage({
  user,
  newsList,
  onNewsDelete,
  onSaveChangedNewsEntry
}) {
  return (
    <>
      <Header>
        <Headline>Klarcare</Headline>
        <HeaderButton to="/create">
          <Icon icon="plus" />
        </HeaderButton>
      </Header>
      <ContentContainer>
        <NewsList
          user={user}
          newsList={newsList}
          onNewsDelete={onNewsDelete}
          onSaveChangedNewsEntry={onSaveChangedNewsEntry}
        />
      </ContentContainer>
    </>
  );
}
