const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
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
    default: "https://media.istockphoto.com/id/1390982572/photo/customer-asking-medicine-to-pharmacist-by-showing-doctor-proscription-at-pharma-retail-store.jpg?s=1024x1024&w=is&k=20&c=58xOfGcpTb3v3gRkQTh4VTdJ5ElM4_P0LcGbovWa17U=",
    set: (v) => v === "" ? "https://media.istockphoto.com/id/1390982572/photo/customer-asking-medicine-to-pharmacist-by-showing-doctor-proscription-at-pharma-retail-store.jpg?s=1024x1024&w=is&k=20&c=58xOfGcpTb3v3gRkQTh4VTdJ5ElM4_P0LcGbovWa17U=" : v
  },

  location: {
    village: { type: String, trim: true },
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] }
    }
  },

  contactPhone: { type: String, trim: true },

  medicineStock: [
    {
      medicineName: { type: String, trim: true, required: true },
      quantity: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    }
  ],

  isOpenNow: { type: Boolean, default: true }

}, { timestamps: true });

pharmacySchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Pharmacy", pharmacySchema);