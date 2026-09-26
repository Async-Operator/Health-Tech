const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  location: { type: String },
  medicineStock: [
    {
      medicineName: String,
      quantity: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Pharmacy", pharmacySchema);