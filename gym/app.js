require('dotenv').config(); // Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const UserRoutes = require("./Routes/UserRoutes");
const FinanceRouter = require("./Routes/FinanceRouter");
const ScheduleRoute = require("./Routes/ScheduleRoute");
const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/users", UserRoutes);
app.use("/finance", FinanceRouter);
app.use("/schedules", ScheduleRoute);
app.use("/user-schedule-creations", UserScheduleCreationRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI) // No deprecated options needed
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Start server after DB connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
