import React from "react";
import "./SchedulePage.css";
import { Link } from "react-router-dom";


function SchedulePage() {
  // Example data for timetable (7 days, time slots)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const times = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"];

  return (
    <div className="schedule-page">
      <div className="schedule-box">
        <h1 className="schedule-title">Weekly Timetable</h1>

        {/* Table */}
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className="time-col">{time}</td>
                {days.map((day, colIndex) => (
                  <td key={colIndex} className="slot-cell">
                    {/* Placeholder content */}
                    -
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom buttons */}
        <div className="bottom-btns">
  <Link to="/slotrequest" className="action-btn">Request for Timeslot</Link>
  <button className="action-btn">View Profile</button>
</div>
      </div>
    </div>
  );
}

export default SchedulePage;
