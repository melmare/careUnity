import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './Title';
import Author from './Author';
import Description from './Description';
import Activity from './Activity';
import Activities from './Activities';

const EntryContainer = styled.article`
  background: lightgray;
  border-radius: 3%;
  width: 100%;
  margin: 0 15px 30px 15px;
`;

export default function Entry({ entry }) {
  const { title, author, activities, description } = entry;
  return (
    <EntryContainer>
      <Title>{title}</Title>
      <Author>Erstellt von {author}</Author>
      <Activities>
        {activities.map(activity => (
          <Activity activity={activity} key={activities.indexOf(activity)} />
        ))}
      </Activities>

      <Description>{description}</Description>
    </EntryContainer>
  );
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  activities: PropTypes.array,
  description: PropTypes.string
};
