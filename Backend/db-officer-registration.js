const mongoose = require("mongoose");
require("dotenv").config();
console.log("🔍 OFFICER_MONGO_URI:", process.env.OFFICER_MONGO_URI);

const connectOfficerDB = async () => {
  try {
    if (!process.env.OFFICER_MONGO_URI) {
      throw new Error("❌ OFFICER_MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.OFFICER_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to Officer DB");
  } catch (error) {
    console.error("❌ Error connecting to Officer DB:", error.message);
    process.exit(1);
  }
};

connectOfficerDB();

module.exports = mongoose;