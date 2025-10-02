require('dotenv').config(); // Load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);// Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const UserRoutes = require("./Routes/UserRoutes");
// Add your other routers if needed
// const FinanceRouter = require("./Routes/FinanceRouter");
// const ScheduleRoute = require("./Routes/ScheduleRoute");
// const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");
const storeRouter = require("./Routes/StoreRoutes");
// Fix: define favouriteRouter with correct path/casing
const favouriteRouter = require("./Routes/StoreFavourite");
const OrderRoutes = require("./Routes/OrderRoutes");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/store", storeRouter);
app.use("/store-favourites", favouriteRouter);



// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ==========================
// Root Route
// ==========================
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ==========================
// API Routes
// ==========================
app.use("/users", UserRoutes);
app.use("/store", storeRouter);
app.use("/store-favourites", favouriteRouter);
app.use("/orders", OrderRoutes);

// ==========================
// MongoDB Connection
// ==========================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

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
