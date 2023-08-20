import React, { useState } from "react";
import "../styles/App.css";
const CalendarApp = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [showYearInput, setShowYearInput] = useState(false);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };
  const handleYearDoubleClick = () => {
    setShowYearInput(true);
  };
  const handleYearChange = (e) => {
    if (e.key === "Enter") {
      setYear(parseInt(e.target.value));
      setShowYearInput(false);
    }
  };
  const handlePreviousYear = () => {
    setYear((prevYear) => prevYear - 1);
  };
  const handleNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };
  const handlePreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };
  const handleNextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };
  const renderTableHeader = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return (
      <tr>
        {daysOfWeek.map((day) => (
          <td key={day}>{day}</td>
        ))}
      </tr>
    );
  };
  const renderTableCells = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];
    const rows = [];
    let dayCounter = 1;
    for (let week = 0; dayCounter <= daysInMonth; week++) {
      const weekCells = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if ((week === 0 && dayOfWeek < firstDay) || dayCounter > daysInMonth) {
          weekCells.push(<td key={`empty-${week}-${dayOfWeek}`} />);
        } else {
          const isToday =
            dayCounter === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          const cellId = isToday ? "today" : `cell-${dayCounter}`;
          weekCells.push(
            <td
              key={cellId}
              className={isToday ? "today-cell" : "current-month-cell"}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      rows.push(<tr key={`week-${week}`}>{weekCells}</tr>);
    }
    return rows;
  };
  return (
    <div className="calendar-container">
      <h1 id="heading">Calendar</h1>
      <select id="month" value={month} onChange={handleMonthChange}>
        {monthNames.map((monthName, index) => (
          <option key={monthName} value={index}>
            {monthName}
          </option>
        ))}
      </select>
      <span id="year" onDoubleClick={handleYearDoubleClick}>
        {year}
      </span>
      {showYearInput && (
        <input
          type="text"
          id="year-text-box"
          value={year}
          onKeyDown={handleYearChange}
          onBlur={() => setShowYearInput(false)}
        />
      )}
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableCells()}</tbody>
      </table>
      <button id="previous-year" onClick={handlePreviousYear}>
        {"<<"}
      </button>
      <button id="previous-month" onClick={handlePreviousMonth}>
        {"<"}
      </button>
      <button id="next-month" onClick={handleNextMonth}>
        {">"}
      </button>
      <button id="next-year" onClick={handleNextYear}>
        {">>"}
      </button>
    </div>
  );
};
export default CalendarApp;
