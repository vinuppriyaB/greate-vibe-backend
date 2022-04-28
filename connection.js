const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("database connected");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
