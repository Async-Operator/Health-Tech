const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  name: { type: String, required: true, trim: true },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  phone: { type: String, trim: true },

  location: {
    village: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    }
  },

  language: {
    type: String,
    enum: ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"],
    default: "English"
  },

  chronicDiseases: [String],
  allergies: [String],

  emergencyContact: {
    name: String,
    phone: String
  },

  profileCompleted: { type: Boolean, default: false }

}, { timestamps: true });

patientSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Patient", patientSchema);