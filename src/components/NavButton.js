import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavButton = styled(NavLink)`
  align-items: center;
  align-content: center;
  background: white;
  border: 3px solid skyblue;
  border-radius: 50%;
  color: skyblue;
  display: flex;
  height: 70px;
  justify-content: center;
  margin-bottom: 15px;
  padding: 5px;
  width: 70px;

  &.active  {
    background: skyblue;
    color: white;
    height: 80px;
    width: 80px;
  }
`;

export default NavButton;
