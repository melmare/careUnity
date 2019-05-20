import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './Title';
import Author from './Author';
import Text from './Text';

const EntryContainer = styled.article`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 15px;
`;

export default function Entry({ title, author, text }) {
  return (
    <EntryContainer>
      <Title>{title}</Title>
      <Author>Erstellt von {author}</Author>
      <Text>{text}</Text>
    </EntryContainer>
  );
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string
};
