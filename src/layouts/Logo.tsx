import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../styles/Variables';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  div {
    position: absolute;
    left: 20px;
    line-height: 0.5;
    font-family: ${FONT.logo};
    font-size: 1.9rem;
    font-weight: 700;
    color: ${COLOR.primary1};
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  z-index: 1;
`;

function Logo() {
  return (
    <Link to="/">
      <Container>
        <div>AYO</div>
        <Img src={logo} alt="logo" />
      </Container>
    </Link>
  );
}

export default Logo;
