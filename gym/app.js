require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const UserRoutes = require("./Routes/UserRoutes");
const FinanceRouter = require("./Routes/FinanceRouter");
const ScheduleRoute = require("./Routes/ScheduleRoute");
const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");
const scheduleChangeRequestRoute = require("./Routes/ScheduleChangeRequestRoute");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ==========================
// Root Route (for testing)
// ==========================
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ==========================
// API Routes
// ==========================
app.use("/users", UserRoutes);
app.use("/finance", FinanceRouter);
app.use("/schedules", ScheduleRoute);
app.use("/user-schedule-creations", UserScheduleCreationRoute);
app.use("/schedule-change-requests", scheduleChangeRequestRoute);

// ==========================
// MongoDB Connection
// ==========================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });

// ==========================
// Global Error Handling (Optional)
// ==========================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal server error" });
});
