const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({ 
  name: String,
  email:String,
  phone: String,     
  village: String,
  age: Number,
  gender: String,
  language: String,
  //healthHistory: [{ consultationId, date, notes }]
})

const Patient = mongoose.model("Patient",patientSchema);
module.exports = Patient;