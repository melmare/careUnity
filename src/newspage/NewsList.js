import React from 'react';
import Entry from './Entry';
import styled from 'styled-components';

const NewsListContainer = styled.section`
  &:first-child {
    padding-top: 40px;
  }
`;
export default function NewsList({ newsList }) {
  return (
    <NewsListContainer>
      {newsList.map(entry => (
        <Entry entry={entry} />
      ))}
    </NewsListContainer>
  );
}
