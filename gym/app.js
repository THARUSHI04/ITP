require('dotenv').config(); // Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./routes/UserRoutes"); // Use consistent casing
const FinanceRouter = require("./routes/FinanceRouter"); // Assuming this exists

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", UserRoutes);
app.use("/finance", FinanceRouter); // Lowercase for consistency

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
