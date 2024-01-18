import { Fragment } from 'react';
import dayjs from 'dayjs';
import useCalendar from '../../hooks/useCalendar';
import Weeks from './Weeks';
import Month from './Month';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../../styles/Variables';
import { grid, media } from '../../styles/Mixin';

interface DayProps {
  text: 'sat' | 'sun' | 'day';
}

const Date = styled.div<DayProps>`
  padding: 10px;
  color: ${({ text }) => text && COLOR.date[text]};
  ${media.mobile} {
    padding: 5px;
    font-size: 0.8rem;
  }
`;

const Cell = styled.div`
  font-size: 0.9rem;

  &:after {
    content: '';
    display: block;
    padding-top: 130%;
  }
`;

const Dates = styled.div`
  ${grid(7)}
  grid-gap: 1px;
  font-family: ${FONT.num};
  background-color: ${COLOR.line};
  border: 1px solid ${COLOR.line};

  div {
    background-color: ${COLOR.bg};
  }
`;

const Div = styled.div`
  padding: 10px;
`;

function Calendar() {
  const { showDate, calendarArray, addMonth, subMonth } = useCalendar();

  const dates = calendarArray.map((date, i) => {
    const theDay = dayjs()
      .year(showDate.year())
      .month(showDate.month())
      .date(date)
      .day();

    return (
      <Fragment key={i}>
        {date ? (
          <Cell>
            <Date text={theDay === 0 ? 'sun' : theDay === 6 ? 'sat' : 'day'}>
              {date}
            </Date>
          </Cell>
        ) : (
          <div />
        )}
      </Fragment>
    );
  });

  return (
    <Div>
      <Month showDate={showDate} addMonth={addMonth} subMonth={subMonth} />
      <Weeks />
      <Dates>{dates}</Dates>
    </Div>
  );
}

export default Calendar;
