const mongoose = require("mongoose");
const initData = require("./patientData.js");
const Patient = require("../models/patient.js");

const MONGO_URL="mongodb://127.0.0.1:27017/Health-Tech";
main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Patient.deleteMany({});
    await Patient.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();