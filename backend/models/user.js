const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "pharmacy"],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;