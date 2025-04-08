const authenticateToken = require("../middleware/auth");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User-registration");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email.endsWith("@collegestudent.edu")) {
    return res.status(400).json({ message: "Use a valid institute email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("❌ User not found:", email);
        return res.status(400).json({ message: "User not found" });
      }
  
      console.log("✅ User found:", user);
  
      console.log("🔹 Stored Password Hash:", user.password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔍 Password Match Result:", isMatch);
  
      if (!isMatch) {
        console.log("❌ Incorrect Password for:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      console.log("✅ Login Successful for:", email);
  
      res.json({
        token,
        role: user.role,
        user: {
          name: user.name,
          email: user.email
        }
      });
          
    } catch (err) {
      console.error("⚠️ Error in login:", err);
      res.status(500).json({ message: "Error logging in" });
    }
  });
// GET Profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

//  UPDATE Profile
router.put("/profile", authenticateToken, async (req, res) => {
  const { name, bio, profilePic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, profilePic },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;