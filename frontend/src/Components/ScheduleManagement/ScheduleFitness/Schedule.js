import React from "react";

function Schedule({ schedule }) {
  // If schedule is undefined, return null (or a placeholder)
  if (!schedule) return null;

  const {
    _id,
    userName,
    age,
    contactNo,
    weight,
    height,
    weeklyFrequence,
    specificType,
    preferedExercise,
  } = schedule;

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px" }}>
      <h2>Schedule Request</h2>
      <p><strong>ID:</strong> {_id}</p>
      <p><strong>Name:</strong> {userName}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Contact Number:</strong> {contactNo}</p>
      <p><strong>Weight:</strong> {weight}</p>
      <p><strong>Height:</strong> {height}</p>
      <p><strong>Weekly Frequence:</strong> {weeklyFrequence}</p>
      <p><strong>Specific Type:</strong> {specificType}</p>
      <p><strong>Preferred Exercise:</strong> {preferedExercise}</p>
    </div>
  );
}

export default Schedule;
