const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

console.log("🔍 USER_MONGO_URI:", process.env.USER_MONGO_URI); // Debugging

const connectDB = async () => {
  try {
    if (!process.env.USER_MONGO_URI) {
      throw new Error("❌ MongoDB URI is missing in .env file");
    }

    const conn = await mongoose.connect(process.env.USER_MONGO_URI, {
      useNewUrlParser: true,  // (Remove this if using latest MongoDB)
      useUnifiedTopology: true, // (Remove this if using latest MongoDB)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ User Registration DB connection error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
