const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  planName: {
    type: String,
    required: [true, "Plan name is required"],
    trim: true,
    minlength: [3, "Plan name must be at least 3 characters long"]
  },
  durationMonths: {
    type: Number,
    required: [true, "Duration is required"],
    min: [1, "Duration must be at least 1 month"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be greater than 0"]
  },
  description: {
    type: String,
    maxlength: [200, "Description can’t be more than 200 characters"]
  },
  highlight: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Finance", FinanceSchema);
