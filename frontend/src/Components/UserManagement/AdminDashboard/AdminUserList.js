import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./AdminUserList.css";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // lowercase to match DB
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error("Fetch users error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered & searched users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.userName || "").toLowerCase().includes(search.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Username", "Email", "Role", "Status"]],
      body: filteredUsers.map((u) => [
        u.userName || "N/A",
        u.email || "N/A",
        u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : "N/A",
        u.isDisabled ? "Disabled" : "Active",
      ]),
    });

    doc.save("users.pdf");
  };

  // Disable/Enable user with immediate UI update
  const toggleDisable = async (id, currentStatus) => {
    try {
      // Optimistically update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isDisabled: !currentStatus } : user
        )
      );

      // Update DB
      await axios.put(`http://localhost:5000/users/${id}`, {
        isDisabled: !currentStatus,
      });
    } catch (err) {
      console.error("Toggle disable error:", err);

      // Revert UI if API fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isDisabled: currentStatus } : user
        )
      );
    }
  };

  // Update user role
  const updateRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        role: newRole.toLowerCase(),
      });
      fetchUsers();
    } catch (err) {
      console.error("Update role error:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin User Management</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-select"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
          <option value="gym">Gym</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={downloadPDF} className="pdf-btn">
          Download PDF
        </button>
      </div>

      {/* User Table */}
      <div className="table-container">
        {loading ? (
          <p className="no-users">Loading users...</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={`http://localhost:5000${user.profileImage}`}
                        alt="Profile"
                        className="profile-img"
                      />
                    </td>
                    <td>{user.userName || "N/A"}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          updateRole(user._id, e.target.value)
                        }
                        className="role-select-table"
                      >
                        <option value="user">User</option>
                        <option value="trainer">Trainer</option>
                        <option value="gym">Gym</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span
                        className={user.isDisabled ? "disabled" : "active"}
                      >
                        {user.isDisabled ? "Disabled" : "Active"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          toggleDisable(user._id, user.isDisabled)
                        }
                        className={
                          user.isDisabled ? "enable-btn" : "disable-btn"
                        }
                      >
                        {user.isDisabled ? "Enable" : "Disable"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-users">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
