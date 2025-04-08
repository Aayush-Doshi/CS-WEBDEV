const express = require("express");
const router = express.Router();
const Officer = require("../models/officer-registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "officer-secret";

// Officer Registration
router.post("/register", async (req, res) => {
    console.log("📥 Officer registration request received:", req.body);

    const { name, email, password } = req.body;
  
    if (!email.endsWith("@collegeadmin.edu")) {
      return res.status(400).json({ message: "Use a valid institute officer email (@collegeadmin.edu)" });
    }
  
    try {
      const existingOfficer = await Officer.findOne({ email });
      if (existingOfficer) return res.status(400).json({ message: "Officer already registered" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newOfficer = new Officer({ name, email, password: hashedPassword });
  
      await newOfficer.save();
  
      const token = jwt.sign({ id: newOfficer._id, role: "officer" }, JWT_SECRET, { expiresIn: "2d" });
      res.status(201).json({
        message: "Officer registered successfully!",
        token,
        role: "officer",
        name: newOfficer.name,
      });      
    } catch (err) {
        console.error("❌ Registration error:", err.message);
      
        if (err.code === 11000) {
          return res.status(400).json({ message: "Officer with this email already exists" });
        }
      
        res.status(500).json({ message: "Server error" });
      }      
  });
  
// Officer Login
router.post("/login", async (req, res) => {
  console.log("📥 Officer login request received:", req.body);

  const { email, password } = req.body;

  try {
    const officer = await Officer.findOne({ email });
    console.log("🔍 Officer found:", officer);

    if (!officer) return res.status(404).json({ message: "Officer not found" });

    const isMatch = await bcrypt.compare(password, officer.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: officer._id, role: "officer" }, JWT_SECRET, { expiresIn: "2d" });
    console.log("✅ Officer login successful:", officer.email);

    res.status(200).json({ token, role: "officer", name: officer.name });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
