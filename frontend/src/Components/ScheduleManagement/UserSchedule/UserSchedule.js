import axios from "axios";
import { useEffect, useState } from "react";
import "./UserSchedule.css";

function UserSchedule({ userId }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/schedules/user/${userId}`)
      .then((res) => {
        setSchedule(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setSchedule(null);
        }
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="loading-text">Loading schedule...</p>;

  return (
    <div className="schedule-container">
      <h2>📅 My Schedule</h2>

      {schedule ? (
        <div className="schedule-card">
          <p><strong>User:</strong> {schedule.userName}</p>
          <p><strong>Time Slot:</strong> {schedule.timeSlot}</p>
          <p><strong>Schedule:</strong></p>
          <pre className="schedule-text">{schedule.schedule}</pre>
        </div>
      ) : (
        <p className="no-schedule">No schedule available</p>
      )}
    </div>
  );
}

export default UserSchedule;
