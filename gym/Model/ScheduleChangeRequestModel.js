
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleChangeRequestSchema = new Schema({
  scheduleId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  changeDetails: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ScheduleChangeRequest", scheduleChangeRequestSchema);