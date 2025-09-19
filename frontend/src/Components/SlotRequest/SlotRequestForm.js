// import React, { useState } from "react";
// import "./SlotRequestForm.css";

// function SlotRequestForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     slotId: "",
//     scheduleId: "",
//     packageType: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="form-container">
//       <form className="form-box" onSubmit={handleSubmit}>
//         <h2 className="form-title">Slot Request Form</h2>

//         <div className="form-group">
//           <label className="form-label">Username</label>
//           <input
//             type="text"
//             name="username"
//             className="form-input"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Enter username"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Slot ID</label>
//           <input
//             type="text"
//             name="slotId"
//             className="form-input"
//             value={formData.slotId}
//             onChange={handleChange}
//             placeholder="Enter slot ID"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Schedule ID</label>
//           <input
//             type="text"
//             name="scheduleId"
//             className="form-input"
//             value={formData.scheduleId}
//             onChange={handleChange}
//             placeholder="Enter schedule ID"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Package Type</label>
//           <select
//             name="packageType"
//             className="form-select"
//             value={formData.packageType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select package</option>
//             <option value="basic">Basic</option>
//             <option value="standard">Standard</option>
//             <option value="premium">Premium</option>
//           </select>
//         </div>

//         <button type="submit" className="submit-btn">
//           Submit Request
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SlotRequestForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "./SlotRequestForm.css";

function SlotRequestForm() {
  const [formData, setFormData] = useState({
    username: "",
    slotId: "",
    scheduleId: "",
    packageType: "",
  });

  const navigate = useNavigate(); // <-- initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Navigate to TimeSchedule page after submit
    navigate("/TimeSchedule");
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Slot Request Form</h2>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Slot ID</label>
          <input
            type="text"
            name="slotId"
            className="form-input"
            value={formData.slotId}
            onChange={handleChange}
            placeholder="Enter slot ID"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Schedule ID</label>
          <input
            type="text"
            name="scheduleId"
            className="form-input"
            value={formData.scheduleId}
            onChange={handleChange}
            placeholder="Enter schedule ID"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Package Type</label>
          <select
            name="packageType"
            className="form-select"
            value={formData.packageType}
            onChange={handleChange}
            required
          >
            <option value="">Select package</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default SlotRequestForm;
