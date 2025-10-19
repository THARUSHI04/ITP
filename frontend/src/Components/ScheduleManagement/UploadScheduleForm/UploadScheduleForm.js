// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./UploadScheduleForm.css";

// const REQUESTS_URL = "http://localhost:5000/schedules";
// const CREATIONS_URL = "http://localhost:5000/user-schedule-creations";

// function UploadScheduleForm({ scheduleId, userId, userName, instructorId, onUpload, onCancel }) {
//   const [formData, setFormData] = useState({
//     requestId: scheduleId || "",
//     userId: userId || "",
//     userName: userName || "",
//     timeSlot: "",
//     schedule: "",
//     instructorId: instructorId || localStorage.getItem("userId") || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const timeSlots = [
//     "Monday 6-8 AM",
//     "Monday 8-10 AM",
//     "Monday 10 AM-12 PM",
//     "Monday 12-2 PM",
//     "Monday 2-4 PM",
//     "Monday 4-6 PM",
//     "Monday 6-8 PM",
//     "Tuesday 6-8 AM",
//     "Tuesday 8-10 AM",
//     "Tuesday 10 AM-12 PM",
//     "Tuesday 12-2 PM",
//     "Tuesday 2-4 PM",
//     "Tuesday 4-6 PM",
//     "Tuesday 6-8 PM",
//     "Wednesday 6-8 AM",
//     "Wednesday 8-10 AM",
//     "Wednesday 10 AM-12 PM",
//     "Wednesday 12-2 PM",
//     "Wednesday 2-4 PM",
//     "Wednesday 4-6 PM",
//     "Wednesday 6-8 PM",
//     "Thursday 6-8 AM",
//     "Thursday 8-10 AM",
//     "Thursday 10 AM-12 PM",
//     "Thursday 12-2 PM",
//     "Thursday 2-4 PM",
//     "Thursday 4-6 PM",
//     "Thursday 6-8 PM",
//     "Friday 6-8 AM",
//     "Friday 8-10 AM",
//     "Friday 10 AM-12 PM",
//     "Friday 12-2 PM",
//     "Friday 2-4 PM",
//     "Friday 4-6 PM",
//     "Friday 6-8 PM",
//   ];

//   useEffect(() => {
//     const fetchRequest = async () => {
//       if (!scheduleId) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${REQUESTS_URL}/${scheduleId}`);
//         const request = res.data.schedule;
//         if (request) {
//           setFormData((prev) => ({
//             ...prev,
//             requestId: request._id,
//             userId: request.userId,
//             userName: request.userName,
//             instructorId: instructorId || localStorage.getItem("userId") || prev.instructorId,
//           }));
//         }
//       } catch (err) {
//         console.error("Failed to fetch request details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequest();
//   }, [scheduleId, instructorId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(CREATIONS_URL, formData);
//       if (onUpload) onUpload(res.data.creation);
//       alert("Schedule uploaded successfully!");
//     } catch (err) {
//       console.error("Failed to upload schedule:", err);
//       alert("Failed to upload schedule.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="upload-form-container">
//       <h2>Upload Schedule for {formData.userName}</h2>
//       <div className="upload-schedule-form">
//         <label>Time Slot</label>
//         <select
//           name="timeSlot"
//           value={formData.timeSlot}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled>Select a time slot</option>
//           {timeSlots.map((slot) => (
//             <option key={slot} value={slot}>{slot}</option>
//           ))}
//         </select>

//         <label>Schedule Details</label>
//         <textarea
//           name="schedule"
//           value={formData.schedule}
//           onChange={handleChange}
//           placeholder="Enter schedule details..."
//           required
//         />

//         <div className="form-buttons">
//           <button type="submit" onClick={handleSubmit}>Upload</button>
//           <button type="button" onClick={onCancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadScheduleForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadScheduleForm.css";

const REQUESTS_URL = "http://localhost:5000/schedules";
const CREATIONS_URL = "http://localhost:5000/user-schedule-creations";

function UploadScheduleForm({ scheduleId, userId, userName, instructorId, onUpload, onCancel }) {
  const [formData, setFormData] = useState({
    requestId: scheduleId || "",
    userId: userId || "",
    userName: userName || "",
    timeSlot: "",
    exerciseType: [], // selected exercises
    schedule: "", // auto-generated from exercises
    instructorId: instructorId || localStorage.getItem("userId") || "",
  });

  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "Monday 6-8 AM", "Monday 8-10 AM", "Monday 10 AM-12 PM", "Monday 12-2 PM",
    "Monday 2-4 PM", "Monday 4-6 PM", "Monday 6-8 PM",
    "Tuesday 6-8 AM", "Tuesday 8-10 AM", "Tuesday 10 AM-12 PM",
    "Tuesday 12-2 PM", "Tuesday 2-4 PM", "Tuesday 4-6 PM", "Tuesday 6-8 PM",
    "Wednesday 6-8 AM", "Wednesday 8-10 AM", "Wednesday 10 AM-12 PM",
    "Wednesday 12-2 PM", "Wednesday 2-4 PM", "Wednesday 4-6 PM", "Wednesday 6-8 PM",
    "Thursday 6-8 AM", "Thursday 8-10 AM", "Thursday 10 AM-12 PM",
    "Thursday 12-2 PM", "Thursday 2-4 PM", "Thursday 4-6 PM", "Thursday 6-8 PM",
    "Friday 6-8 AM", "Friday 8-10 AM", "Friday 10 AM-12 PM", "Friday 12-2 PM",
    "Friday 2-4 PM", "Friday 4-6 PM", "Friday 6-8 PM",
  ];

  const exerciseOptions = [
    "Push-ups",
    "Squats",
    "Lunges",
    "Plank",
    "Mountain Climbers",
    "Burpees",
    "Jumping Jacks",
    "Sit-ups",
    "Crunches",
    "Pull-ups",
    "Leg Raises",
    "Bicep Curls",
    "Tricep Dips",
    "Shoulder Press",
    "Deadlifts",
  ];

  useEffect(() => {
    const fetchRequest = async () => {
      if (!scheduleId) return;
      try {
        setLoading(true);
        const res = await axios.get(`${REQUESTS_URL}/${scheduleId}`);
        const request = res.data.schedule;
        if (request) {
          setFormData((prev) => ({
            ...prev,
            requestId: request._id,
            userId: request.userId,
            userName: request.userName,
            instructorId: instructorId || localStorage.getItem("userId") || prev.instructorId,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch request details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [scheduleId, instructorId]);

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const values = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);

      const scheduleText = values.join(", ");

      setFormData((prev) => ({
        ...prev,
        [name]: values,
        schedule: scheduleText, // exercises become schedule
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalData = {
        ...formData,
        schedule: formData.exerciseType.join(", "),
      };

      const res = await axios.post(CREATIONS_URL, finalData);
      if (onUpload) onUpload(res.data.creation);
      alert("Schedule uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload schedule:", err);
      alert("Failed to upload schedule.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="upload-form-container">
      <h2>Upload Schedule for {formData.userName}</h2>
      <div className="upload-schedule-form">

        {/* Time Slot Dropdown */}
        <label>Time Slot</label>
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        {/* Multi-select Exercises */}
        <label>Exercises (This will become the schedule)</label>
        <select
          name="exerciseType"
          multiple
          value={formData.exerciseType}
          onChange={handleChange}
          required
        >
          {exerciseOptions.map((exercise) => (
            <option key={exercise} value={exercise}>{exercise}</option>
          ))}
        </select>
        <small className="hint">(Hold Ctrl or Cmd to select multiple exercises)</small>

        {/* Line-by-line preview */}
        {formData.exerciseType.length > 0 && (
          <div className="auto-schedule-preview">
            <strong>Generated Schedule:</strong>
            <ul>
              {formData.exerciseType.map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" onClick={handleSubmit}>Upload</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UploadScheduleForm;