import React from "react";
import Calendar from "./calendar";

const Date: React.FC<{}> = () => {
    return (
        <div className="background-container">
            <div className="date-picker-container">
                <Calendar />
            </div>
        </div>
    );
};

export default Date;
