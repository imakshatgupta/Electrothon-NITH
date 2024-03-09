const mongoose= require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("MongoDB Connected")});
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports= connectDB;