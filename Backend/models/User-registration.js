const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "officer"], default: "student" },
  verified: { type: Boolean, default: false },
  bio: { type: String, default: "" },
  profilePic: { type: String, default: "" } // optional
});

module.exports = mongoose.model("User", UserSchema);
