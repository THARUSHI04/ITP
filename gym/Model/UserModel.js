const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "trainer", "gym", "admin"],
      lowercase: true,
    },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role !== "gym";
      },
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },

    // === Gym-specific fields ===
    address: { type: String },
    hours: { type: String },
    membershipFee: { type: Number },
    facilities: { type: String },
    description: { type: String },

    // === Instructor-specific fields ===
    expertise: { type: String },
    experience: { type: Number },
    biography: { type: String },
    sessionType: { type: String, default: "Online" },
    joiningDate: { type: Date },
    notes: { type: String },

    // === Admin-specific fields ===
    // Reuse joiningDate and notes for Admin

  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("UserModel", userSchema);
