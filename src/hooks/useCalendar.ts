import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const getDateArray = (showDate: Dayjs) => {
  const daysInMonth = showDate.daysInMonth();
  const firstDay = showDate.date(1).day();
  const monthArray = [];

  for (let i = 0; i < firstDay; i++) {
    monthArray.push(0);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    monthArray.push(i);
  }
  for (let i = 0; i <= monthArray.length % 7; i++) {
    monthArray.push(0);
  }

  return monthArray;
};

const useCalendar = () => {
  const [showDate, setShowDate] = useState(dayjs());
  const calendarArray = getDateArray(showDate);

  const addMonth = () => {
    setShowDate((prev) => prev.add(1, 'month'));
  };
  const subMonth = () => {
    setShowDate((prev) => prev.subtract(1, 'month'));
  };

  return {
    showDate,
    calendarArray,
    addMonth,
    subMonth,
  };
};

export default useCalendar;
