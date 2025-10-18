require('dotenv').config(); // Load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Load Stripe for payments

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const UserRoutes = require("./Routes/UserRoutes");
const FinanceRouter = require("./Routes/FinanceRouter");
const ScheduleRoute = require("./Routes/ScheduleRoute");
const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");
const scheduleChangeRequestRoute = require("./Routes/ScheduleChangeRequestRoute");
const storeRouter = require("./Routes/StoreRoutes");
const favouriteRouter = require("./Routes/StoreFavourite");
const OrderRoutes = require("./Routes/OrderRoutes");
const PaymentRouter = require("./Routes/PaymentRouter");
const PaymentReceiptRouter = require("./Routes/PaymentReciptRouter");
const StorePaymentRouter = require("./Routes/StorePaymentRouter"); // Store payments

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve uploaded images
app.use("/uploads", express.static("Uploads"));

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
app.use("/store", storeRouter);
app.use("/store-favourites", favouriteRouter);
app.use("/orders", OrderRoutes);
app.use("/payment", PaymentRouter);
app.use("/receipt", PaymentReceiptRouter);
app.use("/store-payment", StorePaymentRouter); // Store payments + receipts

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
// Global Error Handling
// ==========================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal server error" });
});







// require('dotenv').config(); // Load environment variables

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Routes
// const UserRoutes = require("./Routes/UserRoutes");
// const FinanceRouter = require("./Routes/FinanceRouter");
// const ScheduleRoute = require("./Routes/ScheduleRoute");
// const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");
// const scheduleChangeRequestRoute = require("./Routes/ScheduleChangeRequestRoute");

// const app = express();

// // ==========================
// // Middleware
// // ==========================
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // ==========================
// // Root Route (for testing)
// // ==========================
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // ==========================
// // API Routes
// // ==========================
// app.use("/users", UserRoutes);
// app.use("/finance", FinanceRouter);
// app.use("/schedules", ScheduleRoute);
// app.use("/user-schedule-creations", UserScheduleCreationRoute);
// app.use("/schedule-change-requests", scheduleChangeRequestRoute);

// // ==========================
// // MongoDB Connection
// // ==========================
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");

//     // Start server after successful DB connection
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB Connection Error:", err);
//   });

// // ==========================
// // Global Error Handling (Optional)
// // ==========================
// app.use((err, req, res, next) => {
//   console.error("Global Error:", err);
//   res.status(500).json({ message: "Internal server error" });
// });
