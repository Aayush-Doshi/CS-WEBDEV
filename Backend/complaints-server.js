require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const path = require("path");

const complaintRoutes = require("./Routes/complaint-routes");

const app = express();
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/complaints", complaintRoutes); 

mongoose.connect(process.env.COMPLAINTS_MONGO_URI)
  .then(() => console.log("✅ Complaints MongoDB Connected"))
  .catch((err) => console.error("❌ Complaints DB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5501; // Use 5501 as standard port
app.listen(PORT, () => console.log(`🚀 Complaints Server running on port ${PORT}`));
