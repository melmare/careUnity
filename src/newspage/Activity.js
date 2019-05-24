import React from 'react';
import styled from 'styled-components';

const ActivityBox = styled.li`
  background: skyblue;
  border-radius: 5px;
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;
`;

export default function Activity({ activity }) {
  return <ActivityBox>{activity}</ActivityBox>;
}
