const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true
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

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);
module.exports = User;