
// Updated ScheduleModel.js (add userId field to schema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  userId: {  // NEW: added for linking to user
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  contactNo: {
    type: Number,  // Kept as Number to match existing data coercion
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weeklyFrequence: {
    type: Number,
    required: true
  },
  specificType: {
    type: String,
    required: true
  },
  preferedExercise: {
    type: String,
    required: true
  }
}, { timestamps: true });  // Added timestamps for consistency with other models

module.exports = mongoose.model(
  "ScheduleModel",
  scheduleSchema
);