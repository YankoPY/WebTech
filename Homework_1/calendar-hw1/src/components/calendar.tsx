import React, { useState } from "react";
import {
  Hour,
  Hours,
  getDay,
  getDayString,
  getWeek,
} from "../configs/weekdays";
import DayVotes from "./dayVotes";
import { saveMarkedHours } from "../handleVotes/VotesUtils";

type VotesState = Record<number, number[]>;

const Calendar: React.FC = () => {
  const dates = getWeek();
  const [votes, setVotes] = useState<VotesState>({});

  const handleVote = (date: Date, hour: Hour) => {
    const dayKey = getDay(date);
    const updatedVotes = { ...votes };

    if (!updatedVotes[dayKey]) {
      updatedVotes[dayKey] = [];
    }

    const index = updatedVotes[dayKey].indexOf(hour);
    if (index !== -1) {
      updatedVotes[dayKey].splice(index, 1);
    } else {
      updatedVotes[dayKey].push(hour);
    }

    setVotes(updatedVotes);
  };

  const handleSubmit = () => {
    saveMarkedHours(votes);
    window.location.reload();
  };

  return (
      <div className="background-container">
        <div className="calendar-container">
          <div className="hours-container"></div>
          <div className="weekdays-container">
            <div className="week-day">
              <div className="header"></div>
              {[...Hours].map((h) => (
                  <div className="hours" key={h}>
                    {h + ":00"}
                  </div>
              ))}
            </div>
            {dates.map((date) => (
                <div className="week-day" key={date.getTime()}>
                  <div className="header">
                    <div>{getDayString(date)}</div>
                    <div>{date.getDate()}</div>
                  </div>
                  <DayVotes
                      isVoted={(h: Hour) => votes[getDay(date)]?.includes(h)}
                      onClick={(h: Hour) => handleVote(date, h)}
                  />
                </div>
            ))}
          </div>
          <div className="footer">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
  );
};

export default Calendar;
