const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

console.log("🔍 FEEDBACK_MONGO_URI:", process.env.FEEDBACK_MONGO_URI); // Debugging line

const connectDB = async () => {
  try {
    if (!process.env.FEEDBACK_MONGO_URI) {
      throw new Error("❌ MongoDB URI is missing in .env file");
    }

    const conn = await mongoose.connect(process.env.FEEDBACK_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

connectDB(); // Connect to DB when server starts

module.exports = mongoose;
