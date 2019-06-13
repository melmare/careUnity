import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';
import NavIcon from './NavIcon';

const StyledNavigation = styled.nav`
  align-items: center;
  bottom: -10px;
  background: linear-gradient(0deg, white, 90%, transparent);
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  padding-top: 50px;
  width: 100%;
`;

export default function Navigation() {
  return (
    <StyledNavigation>
      <NavButton to="/news">
        <NavIcon icon="home" />
      </NavButton>
      <NavButton to="/todo">
        <NavIcon icon="list" />
      </NavButton>
      <NavButton to="/info">
        <NavIcon icon="first-aid" />
      </NavButton>
      <NavButton to="/user">
        <NavIcon icon="user" />
      </NavButton>
    </StyledNavigation>
  );
}
