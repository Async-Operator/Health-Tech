const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({ 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  image:{
        type:String,

        default:"https://media.istockphoto.com/id/1332513481/photo/young-woman-doctor-smiling-and-working-at-office.jpg?s=1024x1024&w=is&k=20&c=CUhyQHq3HWJJfiNT1rUCRRw5W0_cTxwpegVcFmK6QnE=",
        
        set:(v)=>v===""?"https://media.istockphoto.com/id/1332513481/photo/young-woman-doctor-smiling-and-working-at-office.jpg?s=1024x1024&w=is&k=20&c=CUhyQHq3HWJJfiNT1rUCRRw5W0_cTxwpegVcFmK6QnE=":v,
  },
  specialty: {
    type: String,
    required: true
  },
  hospital: {
    type: String
  },
  experience: {
    type: Number          
  },
  description:{
    type:String
  },
  availability: [
    {
      day: String,         
      slots: [String]      
    }
  ],
  languages: [String],     
  isAvailableNow: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;