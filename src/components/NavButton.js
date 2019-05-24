import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavButton = styled(NavLink)`
  align-items: center;
  background: skyblue;
  border-radius: 50%;
  display: flex;
  height: 100px;
  justify-content: center;
  margin-bottom: 15px;
  padding: 5px;
  width: 100px;
`;

export default NavButton;
