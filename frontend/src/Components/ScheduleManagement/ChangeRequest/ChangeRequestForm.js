import React, { useState } from "react";
import "./ChangeRequestForm.css";

function ChangeRequestForm() {
  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestType || !details) {
      alert("⚠️ Please select a request type and enter details.");
      return;
    }
    // You can replace this with axios POST to backend
    console.log("Submitted:", { requestType, details });
    alert("✅ Request submitted successfully!");
    setRequestType("");
    setDetails("");
  };

  return (
    <div className="form-container">
      <h2>Change Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Request Type:</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          <option value="timeslot">Timeslot Change Request</option>
          <option value="schedule">Schedule Change Request</option>
        </select>

        <label>Details:</label>
        <textarea
          placeholder="Write your request details here..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default ChangeRequestForm;
