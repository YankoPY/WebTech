import React from "react";
import { Hour, Hours } from "../configs/weekdays";
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface DayVotesProps {
  isVoted: (hour: Hour) => boolean;
  onClick: (hour: Hour) => void;
}

const DayVotes: React.FC<DayVotesProps> = ({ isVoted, onClick }) => {
  return (
    <div className="day-votes">
      {Hours.map((h) => (
        <button className="vote-button" onClick={() => onClick(h)}>
          {isVoted(h) ? "✔️" : ""}
        </button>
      ))}
    </div>
  );
};

export default DayVotes;
