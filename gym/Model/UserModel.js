const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      trim: true, 
      lowercase: true, 
      match: [/.+\@.+\..+/, "Please fill a valid email address"] 
    },
    password: { type: String, required: true },
    contactNo: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    role: { type: String, required: true, enum: ["user", "trainer", "gym", "admin"], lowercase: true },
    isApproved: { type: Boolean, default: function () { return this.role !== "gym"; } },
    isDisabled: { type: Boolean, default: false },
    profileImage: { type: String, default: "/images/profile.png" },

    // Gym fields
    address: { type: String },
    hours: { type: String },
    membershipFee: { type: Number },
    facilities: { type: String },
    description: { type: String },

    // Instructor fields
    expertise: { type: String },
    experience: { type: Number },
    biography: { type: String },
    sessionType: { type: String, default: "Online" },
    joiningDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", userSchema);
