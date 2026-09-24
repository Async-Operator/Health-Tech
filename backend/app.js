if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");//for react request


const port = 5000;

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cors());

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const Patient = require("./models/patient.js");
const Doctor = require("./models/doctor.js");
const User  = require("./models/user.js")

const dbUrl = "mongodb://127.0.0.1:27017/Health-Tech";
main()
.then(()=>{
    console.log("connection sucessfull");

    app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
}).catch(err => console.log(err));
async function main(){
    await mongoose.connect(dbUrl);
}

//all doctors:
app.get("/doctors",async(req,res)=>{
    try {
    const allDoctors = await Doctor.find({});
    res.status(200).json(allDoctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//show doctors:
app.get("/doctors/:id",async(req,res)=>{
  try{
    let {id} = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.status(200).json(doctor);
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});



