import React from 'react';
import styled from 'styled-components';

const ColorContainer = styled.div`
  display: flex;
`;

const Color = styled.div`
  height: 100%;
  width: 50px;
  background-color: ${props => props.color};
  border: ${props => props.color};
`;

const StyledColorInput = styled.input`
  display: flex;
  background-color: ${props => props.color};
  border: ${props => props.color};
  opacity: 0.8;
  height: 20px;
  width: 20px;
`;

export default function ColorInput({ userGroup }) {
  function getAvailableColors(userGroup) {
    const colorOptions = [
      '#b2efc0',
      '#9eacb8',
      '#d4bbda',
      '#fffb99',
      '#dbbea2',
      '#76a1b9',
      '#72bda9',
      '#f6b73c'
    ];
    if (userGroup) {
      const userColors = userGroup.users.map(user => user.usercolor);
      return colorOptions.filter(color => !userColors.includes(color));
    } else {
      return colorOptions;
    }
  }

  return (
    <ColorContainer>
      {getAvailableColors(userGroup).map(color => (
        <Color color={color}>
          <StyledColorInput
            type="radio"
            name="usercolor"
            value={color}
            required
          />
        </Color>
      ))}
    </ColorContainer>
  );
}
