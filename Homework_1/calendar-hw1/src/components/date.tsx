import React from "react";
import { Calendar } from "./calendar";
import { Hour } from "../configs/weekdays";

export const Date: React.FC<{}> = ({}) => {
  return (
    <div className="background-container">
      <div className="date-picker-container">
        <Calendar />
      </div>
    </div>
  );
};
