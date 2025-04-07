require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routes/user-register-auth-routes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.USER_MONGO_URI)
  .then(() => console.log("✅ User MongoDB Connected"))
  .catch((err) => console.error("❌ User DB Connection Error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 User Registration Server running on port ${PORT}`));
