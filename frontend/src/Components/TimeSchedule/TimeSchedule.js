import React from "react";
import "./TimeSchedule.css";

const upcomingSlots = [
  {
    id: "1",
    username: "John Doe",
    slot: "Slot A",
    scheduleId: "SCH101",
    packageType: "Standard",
    status: "Pending",
  },
  {
    id: "2",
    username: "Jane Smith",
    slot: "Slot B",
    scheduleId: "SCH102",
    packageType: "Premium",
    status: "Pending",
  },
  // Add more slots as needed
];

function TimeSchedule() {
  const handleCancel = (id) => {
    console.log("Cancel slot with id:", id);
  };

  const handleReschedule = (id) => {
    console.log("Reschedule slot with id:", id);
  };

  return (
    <div className="time-schedule-container">
      <h2 className="time-schedule-title">Upcoming Scheduled Slots</h2>
      {upcomingSlots.map((slot) => (
        <div key={slot.id} className="slot-card">
          <div className="slot-info">
            <p>
              <strong>Username:</strong> {slot.username}
            </p>
            <p>
              <strong>Slot:</strong> {slot.slot}
            </p>
            <p>
              <strong>Schedule ID:</strong> {slot.scheduleId}
            </p>
            <p>
              <strong>Package:</strong> {slot.packageType}
            </p>
          </div>
          <div className="slot-actions">
            <button
              className="action-btn cancel-btn"
              onClick={() => handleCancel(slot.id)}
            >
              Cancel
            </button>
            <button
              className="action-btn reschedule-btn"
              onClick={() => handleReschedule(slot.id)}
            >
              Reschedule
            </button>
          </div>
          <div className="slot-status">
            <span>{slot.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeSchedule;
