import styled from '@emotion/styled';
import { flexCenter, grid } from '../../styles/Mixin';
import { FONT } from '../../styles/Variables';

const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Wrap = styled.div`
  ${grid(7)}
  grid-gap: 1px;
  margin-top: 10px;
  font-family: ${FONT.num};

  div {
    ${flexCenter}
    font-size: 0.7rem;
    padding: 10px 0;

    &:after {
      content: '';
      display: block;
    }
  }
`;

function Weeks() {
  const weeks = WEEKS.map((week, i) => {
    return (
      <div className="week" key={i}>
        {week}
      </div>
    );
  });

  return <Wrap>{weeks}</Wrap>;
}

export default Weeks;
