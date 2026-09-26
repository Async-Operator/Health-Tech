const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  village: { type: String },
  language: { type: String },
  chronicDiseases: [String],
  healthHistory: [
    {
      consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
      date: Date,
      notes: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);