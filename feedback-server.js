
require("dotenv").config();
console.log("🔍 FEEDBACK_MONGO_URI:", process.env.FEEDBACK_MONGO_URI); // Debugging

const express = require("express");
const cors = require("cors");

const mongoose = require("./db-feedback"); // Import MongoDB connection
const Feedback = require("./models/feedbackModel"); // Import Mongoose model

const app = express();
const PORT = 5002;

// Middleware
app.use(express.json());
app.use(cors());

// ➤ API to Submit Feedback (POST)
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, rating, feedback } = req.body;
    if (!name || !rating || !feedback) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newFeedback = new Feedback({ name, rating, feedback });
    await newFeedback.save();

    res.status(201).json({ message: "✅ Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "❌ Server error. Try again later." });
  }
});

// ➤ API to Get All Feedback (GET)
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Get latest first
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "❌ Server error. Try again later." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});