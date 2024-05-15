import { useState } from "react";
import {
  Hour,
  Hours,
  getDay,
  getDayString,
  getWeek,
} from "../configs/weekdays";
import DayVotes from "./dayVotes";

export function Calendar() {
  const dates = getWeek();
  const [votes, setVotes] = useState<Record<number, number[]>>({});
  return (
    <div className="background-container">
      <div className="calendar-container">
        <div className="hours-container"></div>
        <div className="weekdays-container">
          <div className="week-day">
            <div className="header"></div>
            {[...Hours].map((h) => (
              <div className="hours">{h + ":00"}</div>
            ))}
          </div>
          {dates.map((date) => (
            <div className="week-day">
              <div className="header">
                <div>{getDayString(date)}</div>
                <div>{date.getDate()}</div>
              </div>
              <DayVotes
                isVoted={(h: Hour) => votes[getDay(date)]?.includes(h)}
                onClick={(h: Hour) => {
                  if (!votes[getDay(date)]) {
                    votes[getDay(date)] = [];
                    setVotes({ ...votes });
                  }
                  if (votes[getDay(date)].includes(h)) {
                    votes[getDay(date)].splice(
                      votes[getDay(date)].indexOf(h),
                      1
                    );
                  } else {
                    votes[getDay(date)].push(h);
                  }
                  setVotes({ ...votes });
                }}
              />
            </div>
          ))}
        </div>
        <div className="footer">
          <button
            className="submit-button"
            onClick={() => window.location.reload()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
