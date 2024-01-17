import { auther } from '../config';
import { RxExternalLink, RxGithubLogo } from 'react-icons/rx';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../styles/Variables';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-family: ${FONT.logo};
  font-size: 1.5rem;
  font-weight: 700;
  div {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const FOOTER = styled.footer`
  padding: 50px 30px;
  color: ${COLOR.grey};
  background-color: ${COLOR.subBg};

  div {
    display: flex;
    padding: 5px 0;

    a {
      padding: 0 5px;
      font-size: 0.9rem;
      font-weight: 700;
      :hover {
        color: ${COLOR.primary};
      }

      svg {
        padding: 0 2px;
      }
    }
  }
`;

function Footer() {
  return (
    <FOOTER>
      <Title>
        AYO
        <div>- All Your OTT</div>
      </Title>
      <div>
        <RxGithubLogo />
        <a href={auther.github} target="_blank" rel="noreferrer">
          Github Repository
          <RxExternalLink />
        </a>
      </div>
      <div>
        Created by
        <a href={auther.blog} target="_blank" rel="noreferrer">
          {auther.name}
          <RxExternalLink />
        </a>
      </div>
    </FOOTER>
  );
}

export default Footer;
