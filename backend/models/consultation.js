const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  symptoms: String,
  prescription: String
}, { timestamps: true });

module.exports = mongoose.model("Consultation", consultationSchema);