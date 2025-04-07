require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const officerAuthRoutes = require("./Routes/officer-register-auth-routes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.OFFICER_MONGO_URI)
  .then(() => console.log("✅ Officer MongoDB Connected"))
  .catch((err) => console.error("❌ Officer DB Connection Error:", err));

app.use("/api/officer/auth", officerAuthRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Officer Registration Server running on port ${PORT}`));