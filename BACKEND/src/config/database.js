const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/resep-nusantara";

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
};

module.exports = connectDatabase;
