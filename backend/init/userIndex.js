const mongoose = require("mongoose");
const initData = require("./userData.js");
const User = require("../models/user.js");

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

const initDB = async () => {
  await User.deleteMany({});

  for (const data of initData.data) {
    const user = new User({
      email: data.email,
      role: data.role,
      isVerified: true,
    });

    await User.register(user, data.password);

    console.log(`Created: ${data.email}`);
  }

  console.log("Data was initialized");
};

initDB();