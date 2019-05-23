import React from 'react';
import styled from 'styled-components';

const ActivityBox = styled.li`
  list-style: none;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  background: skyblue;
  display: inline-block;
`;

export default function Activity({ activity }) {
  return <ActivityBox>{activity}</ActivityBox>;
}
