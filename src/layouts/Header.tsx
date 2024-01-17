import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../features/state';
import { useAuth } from '../features/auth/useAuth';
import Logo from './Logo';
import Nav from './Nav';
import styled from '@emotion/styled';
import { BasicButton } from '../styles/Common';
import { COLOR } from '../styles/Variables';

const FirstLine = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

interface LinkStyle {
  colors?: StyleProps;
}

const Logout = styled.div`
  ${BasicButton({ border: COLOR.grey, text: COLOR.grey })}
  :hover {
    border: 1px solid ${COLOR.text};
    color: ${COLOR.text};
  }
`;

const AuthLink = styled(Link)<LinkStyle>`
  ${({ colors }) => BasicButton(colors)}
`;

const User = styled.div`
  padding: 0 10px;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const { isAuthenticated, name } = useRecoilValue(authState);
  const { logout } = useAuth();

  return (
    <header>
      <FirstLine>
        <Logo />
        <Auth>
          {isAuthenticated ? (
            <>
              <User>{name}</User>
              <Logout onClick={logout}>로그아웃</Logout>
            </>
          ) : (
            <>
              <AuthLink to="login" colors={{ border: COLOR.primary }}>
                로그인
              </AuthLink>
              <AuthLink
                to="signup"
                colors={{
                  bg: COLOR.primary,
                  text: COLOR.bg,
                  border: COLOR.primary,
                }}
              >
                회원가입
              </AuthLink>
            </>
          )}
        </Auth>
      </FirstLine>
      <Nav />
    </header>
  );
}

export default Header;
