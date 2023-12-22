import { Link } from 'react-router-dom';
import Logo from './Logo';
import Nav from './Nav';
import styled from '@emotion/styled';

const FirstLine = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Auth = styled.div`
  display: flex;
`;

function Header() {
  return (
    <header>
      <FirstLine>
        <Logo />
        <Auth>
          <Link to="signin">Log in</Link>
          <Link to="signup">Sign up</Link>
        </Auth>
      </FirstLine>
      <Nav />
    </header>
  );
}

export default Header;
