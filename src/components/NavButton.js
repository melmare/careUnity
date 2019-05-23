import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavButton = styled(NavLink)`
  padding: 5px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: skyblue;
  margin-bottom: 15px;
`;

export default NavButton;
