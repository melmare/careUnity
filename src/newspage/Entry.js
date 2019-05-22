import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './Title';
import Author from './Author';
import Description from './Description';

const EntryContainer = styled.article`
  border: 1px solid;
  margin: 5px 25px;
  padding: 15px;
`;

export default function Entry({ title, author, description }) {
  return (
    <EntryContainer>
      <Title>{title}</Title>
      <Author>Erstellt von {author}</Author>
      <Description>{description}</Description>
    </EntryContainer>
  );
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string
};
