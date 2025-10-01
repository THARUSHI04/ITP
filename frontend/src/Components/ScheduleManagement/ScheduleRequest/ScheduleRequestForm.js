// Updated ScheduleRequestForm.js (add userId from localStorage, include in POST, fix contactNo to Number; no other changes)
import React, { useState } from "react";
import axios from "axios";
import "./ScheduleRequestForm.css";

function ScheduleRequestForm() {
  const [inputs, setInputs] = useState({
    userName: "",
    age: "",
    contactNo: "",
    weight: "",
    height: "",
    weeklyFrequence: "",
    specificType: "",
    preferedExercise: "",
  });

  // NEW: Get current userId from localStorage (set during login)
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // Fallback: redirect to login if no userId (edge case)
    alert("Please log in to submit a schedule request.");
    return null;
  }

  // Update input values
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Send request to backend (updated to include userId and fix contactNo to Number)
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/schedules", {
        userId,  // NEW: include userId for linking
        userName: inputs.userName,
        age: Number(inputs.age),
        contactNo: Number(inputs.contactNo),  // FIXED: changed from String to Number to match schema
        weight: Number(inputs.weight),
        height: Number(inputs.height),
        weeklyFrequence: Number(inputs.weeklyFrequence),
        specificType: inputs.specificType,
        preferedExercise: inputs.preferedExercise,
      });
      return response.data;
    } catch (err) {
      console.error("Error submitting schedule:", err);
      alert("Failed to submit schedule. Please try again.");
    }
  };

  // Handle form submission (unchanged, but now includes userId via sendRequest)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();

    if (data) {
      alert("Schedule request submitted successfully!");
      console.log("Submitted data:", data);

      // Reset form fields
      setInputs({
        userName: "",
        age: "",
        contactNo: "",
        weight: "",
        height: "",
        weeklyFrequence: "",
        specificType: "",
        preferedExercise: "",
      });
    }
  };

  return (
    <div className="schedule-page">
      <div className="form-container">
        <h2 className="form-title">Schedule Request</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          {/* Personal Info */}
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            value={inputs.userName}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={inputs.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contact No</label>
              <input
                type="text"  // Keep as text input, but convert to Number in POST
                name="contactNo"
                value={inputs.contactNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Body Details */}
          <div className="form-row">
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={inputs.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={inputs.height}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Preferences */}
          <label>Weekly Frequency</label>
          <select
            name="weeklyFrequence"
            value={inputs.weeklyFrequence}
            onChange={handleChange}
            required
          >
            <option value="">Select days per week</option>
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} day(s) per week
              </option>
            ))}
          </select>

          <label>Specific Training Type</label>
          <select
            name="specificType"
            value={inputs.specificType}
            onChange={handleChange}
            required
          >
            <option value="">Select training type</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Reduce Upper Body">Reduce Upper Body</option>
            <option value="Reduce Stomach">Reduce Stomach</option>
            <option value="Endurance">Endurance</option>
            <option value="Flexibility">Flexibility</option>
          </select>

          <label>Preferred Exercises</label>
          <select
            name="preferedExercise"
            value={inputs.preferedExercise}
            onChange={handleChange}
            required
          >
            <option value="">Select preferred exercise</option>
            <option value="Cardio">Cardio</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="Yoga">Yoga</option>
            <option value="CrossFit">CrossFit</option>
            <option value="HIIT">HIIT</option>
            <option value="Pilates">Pilates</option>
            <option value="Mixed Training">Mixed Training</option>
          </select>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleRequestForm;




// import React, { useState } from "react";
// import axios from "axios";
// import "./ScheduleRequestForm.css";

// function ScheduleRequestForm() {
//   const [inputs, setInputs] = useState({
//     userName: "",
//     age: "",
//     contactNo: "",
//     weight: "",
//     height: "",
//     weeklyFrequence: "",
//     specificType: "",
//     preferedExercise: "",
//   });

//   // Update input values
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Send request to backend
//   const sendRequest = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/schedules", {
//         userName: inputs.userName,
//         age: Number(inputs.age),
//         contactNo: String(inputs.contactNo),
//         weight: Number(inputs.weight),
//         height: Number(inputs.height),
//         weeklyFrequence: Number(inputs.weeklyFrequence),
//         specificType: inputs.specificType,
//         preferedExercise: inputs.preferedExercise,
//       });
//       return response.data;
//     } catch (err) {
//       console.error("Error submitting schedule:", err);
//       alert("Failed to submit schedule. Please try again.");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendRequest();
//     alert("Schedule request submitted successfully!"); // Success alert

//     console.log(inputs);

//     // Reset form fields
//     setInputs({
//       userName: "",
//       age: "",
//       contactNo: "",
//       weight: "",
//       height: "",
//       weeklyFrequence: "",
//       specificType: "",
//       preferedExercise: "",
//     });
//   };

//   return (
//     <div className="schedule-page">
//       <div className="form-container">
//         <h2 className="form-title">Schedule Request</h2>
//         <form onSubmit={handleSubmit} className="schedule-form">
//           {/* Personal Info */}
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="userName"
//             value={inputs.userName}
//             onChange={handleChange}
//             required
//           />

//           <div className="form-row">
//             <div>
//               <label>Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={inputs.age}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Contact No</label>
//               <input
//                 type="text"
//                 name="contactNo"
//                 value={inputs.contactNo}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Body Details */}
//           <div className="form-row">
//             <div>
//               <label>Weight (kg)</label>
//               <input
//                 type="number"
//                 name="weight"
//                 value={inputs.weight}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Height (cm)</label>
//               <input
//                 type="number"
//                 name="height"
//                 value={inputs.height}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Preferences */}
//           <label>Weekly Frequency</label>
//           <select
//             name="weeklyFrequence"
//             value={inputs.weeklyFrequence}
//             onChange={handleChange}
//             required
//           >
//             {[...Array(7)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1} day(s) per week
//               </option>
//             ))}
//           </select>

//           <label>Specific Training Type</label>
//           <select
//             name="specificType"
//             value={inputs.specificType}
//             onChange={handleChange}
//             required
//           >
//             <option value="Weight Loss">Weight Loss</option>
//             <option value="Gain Weight">Gain Weight</option>
//             <option value="Build Muscle">Build Muscle</option>
//             <option value="Reduce Upper Body">Reduce Upper Body</option>
//             <option value="Reduce Stomach">Reduce Stomach</option>
//             <option value="Endurance">Endurance</option>
//             <option value="Flexibility">Flexibility</option>
//           </select>

//           <label>Preferred Exercises</label>
//           <select
//             name="preferedExercise"
//             value={inputs.preferedExercise}
//             onChange={handleChange}
//             required
//           >
//             <option value="Cardio">Cardio</option>
//             <option value="Weightlifting">Weightlifting</option>
//             <option value="Yoga">Yoga</option>
//             <option value="CrossFit">CrossFit</option>
//             <option value="HIIT">HIIT</option>
//             <option value="Pilates">Pilates</option>
//             <option value="Mixed Training">Mixed Training</option>
//           </select>

//           <button type="submit">Submit Request</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ScheduleRequestForm;
