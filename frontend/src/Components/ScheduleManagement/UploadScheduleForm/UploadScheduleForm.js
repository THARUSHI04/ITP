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
    schedule: "",
    instructorId: instructorId || localStorage.getItem("userId") || "",
  });

  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "Monday 6-8 AM",
    "Monday 8-10 AM",
    "Monday 10 AM-12 PM",
    "Monday 12-2 PM",
    "Monday 2-4 PM",
    "Monday 4-6 PM",
    "Monday 6-8 PM",
    "Tuesday 6-8 AM",
    "Tuesday 8-10 AM",
    "Tuesday 10 AM-12 PM",
    "Tuesday 12-2 PM",
    "Tuesday 2-4 PM",
    "Tuesday 4-6 PM",
    "Tuesday 6-8 PM",
    "Wednesday 6-8 AM",
    "Wednesday 8-10 AM",
    "Wednesday 10 AM-12 PM",
    "Wednesday 12-2 PM",
    "Wednesday 2-4 PM",
    "Wednesday 4-6 PM",
    "Wednesday 6-8 PM",
    "Thursday 6-8 AM",
    "Thursday 8-10 AM",
    "Thursday 10 AM-12 PM",
    "Thursday 12-2 PM",
    "Thursday 2-4 PM",
    "Thursday 4-6 PM",
    "Thursday 6-8 PM",
    "Friday 6-8 AM",
    "Friday 8-10 AM",
    "Friday 10 AM-12 PM",
    "Friday 12-2 PM",
    "Friday 2-4 PM",
    "Friday 4-6 PM",
    "Friday 6-8 PM",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(CREATIONS_URL, formData);
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

        <label>Schedule Details</label>
        <textarea
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          placeholder="Enter schedule details..."
          required
        />

        <div className="form-buttons">
          <button type="submit" onClick={handleSubmit}>Upload</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UploadScheduleForm;








// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./UploadScheduleForm.css";

// const URL = "http://localhost:5000/schedules";

// function UploadScheduleForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const scheduleId = location.state?.scheduleId ?? null; // editing if present

//   const [formData, setFormData] = useState({
//     id: "",        
//     userName: "",
//     schedule: "",
//     timeSlot: ""    // added field
//   });

//   const [loading, setLoading] = useState(false);

//   // If editing (scheduleId present) → fetch schedule and prefill form
//   useEffect(() => {
//     const fetchSchedule = async (id) => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${URL}/${id}`);
//         const schedule = res.data.schedule;
//         if (schedule) {
//           setFormData({
//             id: schedule._id ?? "",
//             userName: schedule.userName ?? "",
//             schedule: schedule.schedule ?? "",
//             timeSlot: schedule.timeSlot ?? ""
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch schedule:", err);
//         alert("Failed to load schedule for editing.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (scheduleId) {
//       fetchSchedule(scheduleId);
//     }
//   }, [scheduleId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       userName: formData.userName,
//       schedule: formData.schedule,
//       timeSlot: formData.timeSlot
//     };

//     try {
//       if (scheduleId) {
//         // Update
//         await axios.put(`${URL}/${scheduleId}`, payload);
//         alert("Schedule updated successfully!");
//       } else {
//         // Create new
//         await axios.post(URL, payload);
//         alert("Schedule created successfully!");
//       }
//       navigate("/FitnessSchedule");
//     } catch (err) {
//       console.error("Error sending schedule:", err);
//       alert("Failed to save schedule. See console for details.");
//     }
//   };

//   if (loading) return <div>Loading schedule...</div>;

//   return (
//     <div className="upload-form-container">
//       <h2>{scheduleId ? "Edit Schedule" : "Upload / Create Schedule"}</h2>
//       <form onSubmit={handleSubmit} className="upload-schedule-form">
        
//         {/* Only show ID if editing */}
//         {scheduleId && (
//           <>
//             <label>ID</label>
//             <input
//               type="text"
//               name="id"
//               value={formData.id}
//               readOnly
//             />
//           </>
//         )}

//         <label>Full Name</label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           required
//         />

//         <label>Time Slot</label>
//         <input
//           type="text"
//           name="timeSlot"
//           value={formData.timeSlot}
//           onChange={handleChange}
//           placeholder="e.g. Monday 9-11 AM"
//           required
//         />

//         <label>Schedule</label>
//         <textarea
//           name="schedule"
//           value={formData.schedule}
//           onChange={handleChange}
//           placeholder="Enter schedule details here..."
//           required
//         />

      

//         <div className="form-buttons">
//           <button type="submit">{scheduleId ? "Update" : "Submit"}</button>
//           <button type="button" onClick={() => navigate("/FitnessSchedule")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UploadScheduleForm;


//////////////////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./UploadScheduleForm.css";

// const URL = "http://localhost:5000/schedules";

// function UploadScheduleForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const scheduleId = location.state?.scheduleId; // read scheduleId

//   const [formData, setFormData] = useState({
//     instructorId: "",
//     instructorName: "",
//     userId: "",
//     userName: "",
//     timeSlot: "",
//     scheduleDetails: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(URL, { ...formData, scheduleId });
//       alert("Schedule uploaded successfully!");
//       navigate("/FitnessSchedule"); // go back to list
//     } catch (error) {
//       console.error(error);
//       alert("Error uploading schedule.");
//     }
//   };

//   return (
//     <div className="upload-form-container">
//       <h2>Upload Schedule</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Instructor ID:</label>
//         <input
//           type="text"
//           name="instructorId"
//           value={formData.instructorId}
//           onChange={handleChange}
//           required
//         />

//         <label>Instructor Name:</label>
//         <input
//           type="text"
//           name="instructorName"
//           value={formData.instructorName}
//           onChange={handleChange}
//           required
//         />

//         <label>User ID:</label>
//         <input
//           type="text"
//           name="userId"
//           value={formData.userId}
//           onChange={handleChange}
//           required
//         />

//         <label>User Name:</label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           required
//         />

//         <label>Time Slot:</label>
//         <input
//           type="text"
//           name="timeSlot"
//           value={formData.timeSlot}
//           onChange={handleChange}
//           placeholder="e.g. Monday 9-11 AM"
//           required
//         />

//         <label>Schedule Details:</label>
//         <textarea
//           name="scheduleDetails"
//           value={formData.scheduleDetails}
//           onChange={handleChange}
//           required
//         />

//         <div className="form-buttons">
//           <button type="submit">Submit</button>
//           <button type="button" onClick={() => navigate("/FitnessSchedule")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UploadScheduleForm;
