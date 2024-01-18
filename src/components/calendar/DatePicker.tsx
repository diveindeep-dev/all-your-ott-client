import { Dispatch, Fragment, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useCalendar from '../../hooks/useCalendar';
import Weeks from './Weeks';
import Month from './Month';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../../styles/Variables';
import { flexCenter, grid } from '../../styles/Mixin';

const Cell = styled.div`
  ${flexCenter}

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid ${COLOR.grey};
    border-radius: 100%;
  }
  &.selected {
    background-color: ${COLOR.primary};
    color: ${COLOR.bg};
    border-radius: 100%;
  }
`;

const Dates = styled.div`
  ${grid(7)}
  grid-gap: 5px;
  font-family: ${FONT.num};

  div {
    ${flexCenter}
    font-size: 0.9rem;
  }
`;

const Div = styled.div`
  padding: 10px;
`;

interface DatePickerProps {
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
}

function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  const { showDate, calendarArray, addMonth, subMonth } = useCalendar();

  const toDayjs = (date: number) => {
    return dayjs().year(showDate.year()).month(showDate.month()).date(date);
  };

  const isSelected = (date: number) =>
    selectedDate.isSame(toDayjs(date), 'day');

  const dates = calendarArray.map((date, i) => {
    return (
      <Fragment key={i}>
        {date ? (
          <Cell
            className={isSelected(date) ? 'selected' : ''}
            onClick={() => setSelectedDate(toDayjs(date))}
          >
            {date}
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

export default DatePicker;
