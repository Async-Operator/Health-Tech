const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  name: { type: String, required: true, trim: true },

  image: {
    type: String,
    default: "https://media.istockphoto.com/id/1332513481/photo/young-woman-doctor-smiling-and-working-at-office.jpg?s=1024x1024&w=is&k=20&c=CUhyQHq3HWJJfiNT1rUCRRw5W0_cTxwpegVcFmK6QnE=",
    set: (v) => v === "" ? "https://media.istockphoto.com/id/1332513481/photo/young-woman-doctor-smiling-and-working-at-office.jpg?s=1024x1024&w=is&k=20&c=CUhyQHq3HWJJfiNT1rUCRRw5W0_cTxwpegVcFmK6QnE=" : v
  },

  specialty: { type: String, required: true, trim: true },
  hospital: { type: String, trim: true },
  experience: { type: Number },
  description: { type: String, trim: true },

  qualifications: [
    {
      degree: { type: String, trim: true },
      institution: { type: String, trim: true },
      year: { type: Number }
    }
  ],

  location: {
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] }
    }
  },

  availability: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      slots: [String]
    }
  ],

  languages: [{ type: String, enum: ["English", "Hindi", "Odia", "Bengali", "Telugu", "Tamil"] }],

  isAvailableNow: { type: Boolean, default: false }

}, { timestamps: true });

doctorSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Doctor", doctorSchema);