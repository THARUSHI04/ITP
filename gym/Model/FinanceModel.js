const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema(
  {
    planName: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      minlength: [3, "Plan name must be at least 3 characters long"],
    },
    durationMonths: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 month"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },
    description: {
      type: String,
      maxlength: [200, "Description can’t be more than 200 characters"],
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
      maxlength: 10,
    },
    discount_percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    final_price: {
      type: Number,
      default: 0,
    },
    access_level: {
      type: String,
      default: "Gym only",
    },
    features_included: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", FinanceSchema);
