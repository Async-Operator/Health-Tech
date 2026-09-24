const mongoose = require("mongoose");
const initData = require("./doctorData.js");
const Doctor = require("../models/doctor.js");

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
    await Doctor.deleteMany({});
    await Doctor.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();