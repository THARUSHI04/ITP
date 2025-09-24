import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Schedule from "./Schedule";
import "./FitnessSchedule.css";

const REQUESTS_URL = "http://localhost:5000/schedules";
const CREATIONS_URL = "http://localhost:5000/user-schedule-creations";

function FitnessSchedule() {
  const [requests, setRequests] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentInstructorId = "12345"; // replace with actual instructor ID

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [reqRes, uploadRes] = await Promise.all([
          axios.get(REQUESTS_URL),
          axios.get(CREATIONS_URL),
        ]);

        if (!mounted) return;

        setRequests(reqRes.data.schedules || []);
        setUploads(uploadRes.data.creations || []);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setRequests([]);
        setUploads([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, []);

  const handleUpload = (request) => {
    navigate("/upload-schedule", {
      state: {
        scheduleId: request._id,
        userId: request.userId,
        userName: request.userName,
        instructorId: currentInstructorId,
      },
    });
  };

  // ✅ Delete request, not uploaded schedule
  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${REQUESTS_URL}/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete request:", err);
      alert("Failed to delete request.");
    }
  };

  if (loading) return <h2>Loading schedules...</h2>;

  return (
    <div className="fitness-schedule-container">
      <h1>Fitness Schedule Requests</h1>

      {requests.length === 0 ? (
        <p>No schedule requests found.</p>
      ) : (
        requests.map((request) => {
          const uploaded = uploads.find((u) => u.requestId === request._id);

          return (
            <div key={request._id} className="schedule-card">
              <Schedule schedule={request} />

              <div className="schedule-buttons">
                {!uploaded && (
                  <button
                    className="upload-btn"
                    onClick={() => handleUpload(request)}
                  >
                    Upload Schedule
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRequest(request._id)}
                >
                  Delete Request
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FitnessSchedule;











// // src/Components/ScheduleManagement/ScheduleFitness/FitnessSchedule.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Schedule from "./Schedule"; // Keep your Schedule card component
// import "./FitnessSchedule.css";

// const URL = "http://localhost:5000/schedules";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// function FitnessSchedule() {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHandler().then((data) => {
//       setSchedules(data.schedules || []);
//       setLoading(false);
//     });
//   }, []);

//   // Navigate to UploadSchedule page
//   const handleUploadClick = (id) => {
//     navigate("/upload-schedule", { state: { scheduleId: id } });
//   };

//   // Delete schedule
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this schedule?")) return;
//     try {
//       await axios.delete(`${URL}/${id}`);
//       setSchedules(schedules.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete schedule:", err);
//       alert("Failed to delete schedule.");
//     }
//   };

//   // Update schedule
//   const handleUpdate = async (id) => {
//     const newName = prompt("Enter new user name:");
//     if (!newName) return;
//     try {
//       const res = await axios.put(`${URL}/${id}`, { userName: newName });
//       setSchedules(schedules.map(s => s._id === id ? res.data.schedules : s));
//     } catch (err) {
//       console.error("Failed to update schedule:", err);
//       alert("Failed to update schedule.");
//     }
//   };

//   if (loading) return <h2>Loading schedules...</h2>;

//   return (
//     <div className="fitness-schedule-container">
//       <h1>Fitness Schedule Requests</h1>

//       {schedules.length === 0 ? (
//         <p>No schedules found.</p>
//       ) : (
//         schedules.map((schedule) => (
//           <div key={schedule._id} className="schedule-card">
//             <Schedule schedule={schedule} />

//             <div className="schedule-buttons">
//               <button
//                 className="upload-btn"
//                 onClick={() => handleUploadClick(schedule._id)}
//               >
//                 Upload Schedule
//               </button>

//               <button
//                 className="update-btn"
//                 onClick={() => handleUpdate(schedule._id)}
//               >
//                 Update
//               </button>

//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(schedule._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default FitnessSchedule;

///////////////////////////////////////////////////////////////////////////////////////




// // src/Components/ScheduleManagement/ScheduleFitness/FitnessSchedule.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Schedule from "./Schedule"; // Make sure this path is correct

// import "./FitnessSchedule.css";

// const URL = "http://localhost:5000/schedules";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// function FitnessSchedule() {
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Use navigate for page routing

//   useEffect(() => {
//     fetchHandler().then((data) => {
//       setSchedules(data.schedules || []);
//       setLoading(false);
//     });
//   }, []);

//   const handleUploadClick = (id) => {
//     // Navigate to the Upload Schedule page
//     navigate("/upload-schedule", { state: { scheduleId: id } });
//   };

//   if (loading) return <h2>Loading schedules...</h2>;

//   return (
//     <div className="fitness-schedule-container">
//       <h1>Fitness Schedules Requests</h1>

//       {schedules.length === 0 ? (
//         <p>No schedules found.</p>
//       ) : (
//         schedules.map((schedule) => (
//           <div key={schedule._id} className="schedule-card">
//             <Schedule schedule={schedule} />
//             <button
//               className="upload-btn"
//               onClick={() => handleUploadClick(schedule._id)}
//             >
//               Upload Schedule
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default FitnessSchedule;
