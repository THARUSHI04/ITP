require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);// Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/StoreRoutes");
const favourite = require("./Routes/Storefavourite");

const UserRoutes = require("./Routes/UserRoutes"); // Use consistent casing
const FinanceRouter = require("./Routes/FinanceRouter"); // Assuming this exists
const ScheduleRoute = require("./Routes/ScheduleRoute");
const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");



const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/store", router);
app.use("/StoreFavourite", router);


// Routes
app.use("/users", UserRoutes);
app.use("/finance", FinanceRouter);
app.use("/schedules", ScheduleRoute); // Lowercase for consistency
app.use("/user-schedule-creations", UserScheduleCreationRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error("❌ DB Connection Error:", err);
});
