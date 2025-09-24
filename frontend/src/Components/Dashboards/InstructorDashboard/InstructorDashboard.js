import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorDashboard.css";

// Dashboard sections (simple placeholders)
function InstructorProfile() {
  return (
    <div>
      <h2>Instructor Profile</h2>
      <p>Update your instructor information here.</p>
    </div>
  );
}

function MyClasses() {
  return (
    <div>
      <h2>My Classes</h2>
      <p>Manage your listed training classes here.</p>
    </div>
  );
}

function Schedule() {
  return (
    <div>
      <h2>Schedule</h2>
      <p>Manage your available training schedules.</p>
    </div>
  );
}

function BookedClients() {
  return (
    <div>
      <h2>Booked Clients</h2>
      <p>View clients who have booked sessions with you.</p>
    </div>
  );
}

function Earnings() {
  return (
    <div>
      <h2>Earnings</h2>
      <p>Track your income from training sessions.</p>
    </div>
  );
}

// Main Dashboard
function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate(); // ✅ Added this

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <InstructorProfile />;
      case "classes":
        return <MyClasses />;
      case "schedule":
        return <Schedule />;
      case "clients":
        return <BookedClients />;
      case "earnings":
        return <Earnings />;
      default:
        return <InstructorProfile />;
    }
  };

  return (
    <div className="instructor-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
  className={activeTab === "classes" ? "active" : ""}
  onClick={() => {
    setActiveTab("classes");  // highlight active tab
    navigate("/instructor-schedules"); // navigate to InstructorSchedulePage route
  }}
>
  My Classes
</li>

          <li
            className={activeTab === "schedule" ? "active" : ""}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </li>
          <li
            className={activeTab === "clients" ? "active" : ""}
            onClick={() => setActiveTab("clients")}
          >
            Booked Clients
          </li>
          <li
            className={activeTab === "earnings" ? "active" : ""}
            onClick={() => setActiveTab("earnings")}
          >
            Earnings
          </li>
          
<li
  className={activeTab === "schedules" ? "active" : ""}
  style={{ cursor: "pointer" }}
  onClick={() => {
    setActiveTab("schedules");
    navigate("/FitnessSchedule"); // <-- this will redirect
  }}
>
  Schedule Requests
</li>


          
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default InstructorDashboard;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./InstructorDashboard.css";

// // Dashboard sections (simple placeholders)
// function InstructorProfile() {
//   return (
//     <div>
//       <h2>Instructor Profile</h2>
//       <p>Update your instructor information here.</p>
//     </div>
//   );
// }

// function MyClasses() {
//   return (
//     <div>
//       <h2>My Classes</h2>
//       <p>Manage your listed training classes here.</p>
//     </div>
//   );
// }

// function Schedule() {
//   return (
//     <div>
//       <h2>Schedule</h2>
//       <p>Manage your available training schedules.</p>
//     </div>
//   );
// }

// function BookedClients() {
//   return (
//     <div>
//       <h2>Booked Clients</h2>
//       <p>View clients who have booked sessions with you.</p>
//     </div>
//   );
// }

// function Earnings() {
//   return (
//     <div>
//       <h2>Earnings</h2>
//       <p>Track your income from training sessions.</p>
//     </div>
//   );
// }

// // Main Dashboard
// function InstructorDashboard() {
//   const [activeTab, setActiveTab] = useState("profile");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <InstructorProfile />;
//       case "classes":
//         return <MyClasses />;
//       case "schedule":
//         return <Schedule />;
//       case "clients":
//         return <BookedClients />;
//       case "earnings":
//         return <Earnings />;
//       default:
//         return <InstructorProfile />;
//     }
//   };

//   return (
//     <div className="instructor-dashboard">
//       <aside className="sidebar">
//         <ul>
//           <li
//             className={activeTab === "profile" ? "active" : ""}
//             onClick={() => setActiveTab("profile")}
//           >
//             Profile
//           </li>
//           <li
//             className={activeTab === "classes" ? "active" : ""}
//             onClick={() => setActiveTab("classes")}
//           >
//             My Classes
//           </li>
//           <li
//             className={activeTab === "schedule" ? "active" : ""}
//             onClick={() => setActiveTab("schedule")}
//           >
//             Schedule
//           </li>
//           <li
//             className={activeTab === "clients" ? "active" : ""}
//             onClick={() => setActiveTab("clients")}
//           >
//             Booked Clients
//           </li>
//           <li
//             className={activeTab === "earnings" ? "active" : ""}
//             onClick={() => setActiveTab("earnings")}
//           >
//             Earnings
//           </li>
//           <li
//             className={activeTab === "schedules" ? "active" : ""}
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               setActiveTab("schedules");
//               navigate("/FitnessSchedule"); // redirect to FitnessSchedule page
//             }}
//           >
//             Schedule
//           </li>
//         </ul>
//       </aside>
//       <main className="dashboard-content">
//         {renderContent()}
//       </main>
//     </div>
//   );
// }

// export default InstructorDashboard;
