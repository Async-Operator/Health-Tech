const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  date: { type: String, required: true },   // "2026-09-28"
  slot: { type: String, required: true },   // "10:00 AM"

  status: {
    type: String,
    enum: ["pending", "confirmed", "ongoing", "completed", "cancelled"],
    default: "pending"
  },
  roomId: { type: String },

  symptoms: { type: String, trim: true },

  aiSuggestion: {
    possibleCondition: String,
    urgencyLevel: { type: String, enum: ["low", "medium", "high"] },
    confidence: Number
  },

  prescription: {
    notes: { type: String, trim: true },
    medicines: [
      {
        name: String,
        dosage: String,
        duration: String
      }
    ]
  },

  followUpNeeded: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("Consultation", consultationSchema);