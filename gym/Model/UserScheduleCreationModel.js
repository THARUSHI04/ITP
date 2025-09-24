const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheduleCreationSchema = new Schema({
  requestId: {            // NEW: link to original schedule request
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  instructorId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model(
  "UserScheduleCreationModel",
  userScheduleCreationSchema
);



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userScheduleCreationSchema = new Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   instructorId: {
//     type: String,
//     required: true
//   },
//   userName: {
//     type: String,
//     required: true
//   },
//   schedule: {
//     type: String,
//     required: true
//   },
//   timeSlot: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model(
//   "UserScheduleCreationModel",
//   userScheduleCreationSchema
// );
