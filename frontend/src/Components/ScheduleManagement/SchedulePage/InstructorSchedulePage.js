// // src/Components/ScheduleManagement/SchedulePage/InstructorSchedulePage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./InstructorSchedulePage.css";

// const InstructorSchedulePage = () => {
//   const [schedules, setSchedules] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [filteredSchedule, setFilteredSchedule] = useState(null);
//   const [editedSchedule, setEditedSchedule] = useState({ schedule: "", timeSlot: "" });
//   const [changeRequests, setChangeRequests] = useState([]); // NEW: State for change requests

//   const URL = "http://localhost:5000/user-schedule-creations";
//   const CHANGE_REQUEST_URL = "http://localhost:5000/schedule-change-requests"; // NEW: Endpoint for change requests

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const res = await axios.get(URL);
//         setSchedules(res.data.creations);
//       } catch (err) {
//         console.error("Error fetching schedules:", err);
//       }
//     };
//     fetchSchedules();

//     // NEW: Fetch change requests
//     const fetchChangeRequests = async () => {
//       try {
//         const res = await axios.get(CHANGE_REQUEST_URL);
//         setChangeRequests(res.data.requests);
//       } catch (err) {
//         console.error("Error fetching change requests:", err);
//       }
//     };
//     fetchChangeRequests();
//   }, []);

//   useEffect(() => {
//     if (selectedUserId) {
//       const schedule = schedules.find((s) => s.userId === selectedUserId);
//       setFilteredSchedule(schedule ?? null);
//       if (schedule) {
//         setEditedSchedule({ schedule: schedule.schedule, timeSlot: schedule.timeSlot });
//       }
//     } else {
//       setFilteredSchedule(null);
//     }
//   }, [selectedUserId, schedules]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedSchedule((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     if (!filteredSchedule) return;
//     try {
//       const res = await axios.put(`${URL}/${filteredSchedule._id}`, editedSchedule);
//       alert("Schedule updated successfully!");
//       setSchedules((prev) =>
//         prev.map((s) => (s._id === filteredSchedule._id ? res.data.creation : s))
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update schedule.");
//     }
//   };

//   const handleDelete = async () => {
//     if (!filteredSchedule) return;
//     if (!window.confirm("Are you sure you want to delete this schedule?")) return;
//     try {
//       await axios.delete(`${URL}/${filteredSchedule._id}`);
//       alert("Schedule deleted successfully!");
//       setSchedules((prev) => prev.filter((s) => s._id !== filteredSchedule._id));
//       setSelectedUserId("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete schedule.");
//     }
//   };

//   // NEW: Handle delete change request
//   const handleDeleteChangeRequest = async (requestId) => {
//     if (!window.confirm("Are you sure you want to delete this change request?")) return;
//     try {
//       await axios.delete(`${CHANGE_REQUEST_URL}/${requestId}`);
//       alert("Change request deleted successfully!");
//       setChangeRequests((prev) => prev.filter((req) => req._id !== requestId));
//     } catch (err) {
//       console.error("Failed to delete change request:", err);
//       alert("Failed to delete change request.");
//     }
//   };

//   return (
//     <div className="instructor-schedule-page">
      

//       <h2>Instructor Schedule Management</h2>

//       {/* Search dropdown */}
//       <label>Search by User ID:</label>
//       <select
//         value={selectedUserId}
//         onChange={(e) => setSelectedUserId(e.target.value)}
//       >
//         <option value="">-- Select User --</option>
//         {schedules.map((s) => (
//           <option key={s._id} value={s.userId}>
//             {s.userName} ({s.userId})
//           </option>
//         ))}
//       </select>

//       {/* Display selected schedule */}
//       {filteredSchedule && (
//         <div className="schedule-card">
//           <h3>Schedule Details</h3>
//           <p><strong>User Name:</strong> {filteredSchedule.userName}</p>
//           <p>
//             <strong>Schedule:</strong>
//             <textarea
//               name="schedule"
//               value={editedSchedule.schedule}
//               onChange={handleChange}
//             />
//           </p>
//           <p>
//             <strong>Time Slot:</strong>
//             <input
//               type="text"
//               name="timeSlot"
//               value={editedSchedule.timeSlot}
//               onChange={handleChange}
//             />
//           </p>
//           <div className="btn-group">
//             <button onClick={handleUpdate}>Update</button>
//             <button onClick={handleDelete}>Delete</button>
//           </div>
//         </div>
//       )}

//       {/* NEW: Change Requests Section */}
//       <div className="change-requests-section">
//         <h3>Schedule Change Requests</h3>
//         {changeRequests.length > 0 ? (
//           <div className="change-requests-list">
//             {changeRequests.map((request) => (
//               <div key={request._id} className="change-request-card">
//                 <p><strong>User ID:</strong> {request.userId}</p>
//                 <p><strong>User Name:</strong> {request.userName}</p>
//                 <p><strong>Schedule ID:</strong> {request.scheduleId}</p>
//                 <p><strong>Change Details:</strong></p>
//                 <pre className="change-request-text">{request.changeDetails}</pre>
//                 <button
//                   className="delete-request-btn"
//                   onClick={() => handleDeleteChangeRequest(request._id)}
//                 >
//                   Delete Request
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-requests">No change requests available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorSchedulePage;





import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InstructorSchedulePage.css";

const InstructorSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [filteredSchedule, setFilteredSchedule] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({ schedule: "", timeSlot: "" });
  const [changeRequests, setChangeRequests] = useState([]);
  const [changeRequestDetails, setChangeRequestDetails] = useState("");
  const [searchError, setSearchError] = useState("");

  const URL = "http://localhost:5000/user-schedule-creations";
  const CHANGE_REQUEST_URL = "http://localhost:5000/schedule-change-requests";

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(URL);
        setSchedules(res.data.creations);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    };
    fetchSchedules();

    const fetchChangeRequests = async () => {
      try {
        const res = await axios.get(CHANGE_REQUEST_URL);
        setChangeRequests(res.data.requests);
      } catch (err) {
        console.error("Error fetching change requests:", err);
      }
    };
    fetchChangeRequests();
  }, []);

  const handleSearch = async () => {
    if (!searchUserId) {
      setSearchError("Please enter a User ID");
      return;
    }
    try {
      const scheduleRes = await axios.get(`${URL}/user/${searchUserId}`);
      setFilteredSchedule(scheduleRes.data.creation);
      setEditedSchedule({
        schedule: scheduleRes.data.creation.schedule,
        timeSlot: scheduleRes.data.creation.timeSlot,
      });

      try {
        const changeRes = await axios.get(`${CHANGE_REQUEST_URL}/user/${searchUserId}`);
        setChangeRequestDetails(changeRes.data.requests[0]?.changeDetails || "No change requests found");
      } catch (err) {
        setChangeRequestDetails("No change requests found");
      }

      setSearchError("");
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
      setSearchError("No schedule found for this User ID");
      setFilteredSchedule(null);
      setChangeRequestDetails("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!filteredSchedule) return;
    try {
      const res = await axios.put(`${URL}/${filteredSchedule._id}`, editedSchedule);
      alert("Schedule updated successfully!");
      setSchedules((prev) =>
        prev.map((s) => (s._id === filteredSchedule._id ? res.data.creation : s))
      );
      setFilteredSchedule(res.data.creation);
    } catch (err) {
      console.error(err);
      alert("Failed to update schedule.");
    }
  };

  const handleDelete = async () => {
    if (!filteredSchedule) return;
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`${URL}/${filteredSchedule._id}`);
      alert("Schedule deleted successfully!");
      setSchedules((prev) => prev.filter((s) => s._id !== filteredSchedule._id));
      setFilteredSchedule(null);
      setSearchUserId("");
      setChangeRequestDetails("");
    } catch (err) {
      console.error(err);
      alert("Failed to delete schedule.");
    }
  };

  const handleDeleteChangeRequest = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this change request?")) return;
    try {
      await axios.delete(`${CHANGE_REQUEST_URL}/${requestId}`);
      alert("Change request deleted successfully!");
      setChangeRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error("Failed to delete change request:", err);
      alert("Failed to delete change request.");
    }
  };

  // Filter change requests: searched User ID's request first, then others
  const matchedRequest = changeRequests.find((req) => req.userId === searchUserId);
  const otherRequests = changeRequests.filter((req) => req.userId !== searchUserId);

  return (
    <div className="instructor-schedule-page">
      <h2>Instructor Schedule Management</h2>

      <div className="search-section">
        <label>Search by User ID:</label>
        <div className="search-input-group">
          <input
            type="text"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            placeholder="Enter User ID (e.g., 68e1e6ac651ac827b819dfe0)"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>
      {searchError && <p className="search-error">{searchError}</p>}

      <div className="change-requests-section">
        <h3>Schedule Change Requests</h3>
        {changeRequests.length > 0 ? (
          <div className="change-requests-list">
            {matchedRequest && (
              <>
                <div key={matchedRequest._id} className="change-request-card">
                  <p><strong>User ID:</strong> {matchedRequest.userId}</p>
                  <p><strong>User Name:</strong> {matchedRequest.userName}</p>
                  <p><strong>Schedule ID:</strong> {matchedRequest.scheduleId}</p>
                  <p><strong>Change Details:</strong></p>
                  <pre className="change-request-text">{matchedRequest.changeDetails}</pre>
                  <button
                    className="delete-request-btn"
                    onClick={() => handleDeleteChangeRequest(matchedRequest._id)}
                  >
                    Delete Request
                  </button>
                </div>
                {filteredSchedule && (
                  <div className="schedule-details-card">
                    <h3>Schedule Details</h3>
                    <p><strong>User ID:</strong> {filteredSchedule.userId}</p>
                    <p><strong>User Name:</strong> {filteredSchedule.userName}</p>
                    <p><strong>Schedule ID:</strong> {filteredSchedule._id}</p>
                    <p><strong>Change Details:</strong> {changeRequestDetails}</p>
                    <p>
                      <strong>Time Slot:</strong>
                      <input
                        type="text"
                        name="timeSlot"
                        value={editedSchedule.timeSlot}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </p>
                    <p>
                      <strong>Schedule:</strong>
                      <textarea
                        name="schedule"
                        value={editedSchedule.schedule}
                        onChange={handleChange}
                        className="edit-textarea"
                      />
                    </p>
                    <div className="btn-group">
                      <button onClick={handleUpdate} className="update-btn">
                        Update
                      </button>
                      <button onClick={handleDelete} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {otherRequests.map((request) => (
              <div key={request._id} className="change-request-card">
                <p><strong>User ID:</strong> {request.userId}</p>
                <p><strong>User Name:</strong> {request.userName}</p>
                <p><strong>Schedule ID:</strong> {request.scheduleId}</p>
                <p><strong>Change Details:</strong></p>
                <pre className="change-request-text">{request.changeDetails}</pre>
                <button
                  className="delete-request-btn"
                  onClick={() => handleDeleteChangeRequest(request._id)}
                >
                  Delete Request
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-requests">No change requests available</p>
        )}
      </div>
    </div>
  );
};

export default InstructorSchedulePage;