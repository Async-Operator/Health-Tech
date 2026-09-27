const mongoose = require("mongoose");
const initData = require("./pharmacyData.js");
const pharmacy = require("../models/pharmacy.js");

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
    await pharmacy.deleteMany({});
    await pharmacy.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();