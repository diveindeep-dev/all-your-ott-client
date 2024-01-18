import { Dayjs } from 'dayjs';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../../styles/Variables';
import { FlexWrapper, flexCenter } from '../../styles/Mixin';

const M = styled.div`
  color: ${COLOR.text};
  font-size: 1.2rem;
`;

const Y = styled.div`
  color: ${COLOR.grey};
  font-size: 0.9rem;
`;

const Current = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${FONT.num};
`;

const Button = styled.div`
  ${flexCenter}
  width: 40px;
  height: 40px;
  margin-left: 5px;
  color: ${COLOR.grey};
  border: 1px solid ${COLOR.line};
  border-radius: 100%;
  font-size: 1rem;
  :hover {
    cursor: pointer;
    border: 1px solid ${COLOR.grey};
  }
`;

interface MonthProps {
  showDate: Dayjs;
  addMonth: () => void;
  subMonth: () => void;
}

function Month({ showDate, addMonth, subMonth }: MonthProps) {
  return (
    <Div>
      <Current>
        <M>{showDate.format('MMMM')}</M>
        <Y>{showDate.year()}</Y>
      </Current>
      <FlexWrapper>
        <Button onClick={subMonth}>
          <IoMdArrowBack />
        </Button>
        <Button onClick={addMonth}>
          <IoMdArrowForward />
        </Button>
      </FlexWrapper>
    </Div>
  );
}
export default Month;
