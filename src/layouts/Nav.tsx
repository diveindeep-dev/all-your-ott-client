import styled from '@emotion/styled';
import { navList } from '../config';
import { NavLink } from 'react-router-dom';
import { COLOR, FONT } from '../styles/Variables';

const NAV = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${COLOR.bg1};
`;

const Item = styled(NavLink)`
  margin: 0 10px;
  padding: 7px 5px;
  color: ${COLOR.text1};
  font-family: ${FONT.body};
  font-weight: 200;
  border-bottom: 2px solid ${COLOR.bg};
  :hover {
    color: ${COLOR.text};
    font-weight: 400;
  }

  &.active {
    color: ${COLOR.text};
    font-weight: 400;
    border-bottom: 2px solid ${COLOR.primary1};
  }
`;

function Nav() {
  return (
    <NAV>
      {navList.map((item, i) => {
        return <Item to={item.nav}>{item.title}</Item>;
      })}
    </NAV>
  );
}

export default Nav;
