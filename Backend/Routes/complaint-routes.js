const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


// === POST Route with File Upload ===
const authenticateToken = require("../middleware/auth");

router.post(
  "/submit",
  authenticateToken,                      // ✅ Secure route
  upload.single("supportingDoc"),
  async (req, res) => {
    try {
      const { subject, description, category } = req.body;
      const submittedBy = req.user.email; // ✅ Extract from token

      const newComplaint = new Complaint({
        subject,
        description,
        category,
        submittedBy,
        supportingDoc: req.file ? req.file.filename : null,
      });

      await newComplaint.save();
      res.status(201).json({ message: "Complaint submitted successfully" });
    } catch (err) {
      console.error("❌ Complaint Submission Error:", err);
      res.status(500).json({ error: "Failed to submit complaint" });
    }
  }
);   
  // === GET Route to Fetch Complaints by User ===
  router.get("/", authenticateToken, async (req, res) => {
    try {
      const submittedBy = req.user.email; // force user's own email
  
      const complaints = await Complaint.find({ submittedBy }).sort({ createdAt: -1 });
      res.status(200).json(complaints);
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });  
  // === GET all complaints (for officers) ===
router.get("/all", authenticateToken, async (req, res) => {
  try {
    // You can add additional checks here to ensure only officers can access this
    if (req.user.role !== "officer") {
      return res.status(403).json({ error: "Access denied" });
    }    
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error("❌ Error fetching all complaints:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

router.post("/:id/update", authenticateToken, async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { status } = req.body;

    // Only officers can update status
    if (req.user.role !== "officer") {
      return res.status(403).json({ error: "Access denied" });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({ message: "Complaint status updated successfully" });
  } catch (err) {
    console.error("❌ Error updating complaint:", err);
    res.status(500).json({ error: "Failed to update complaint status" });
  }
});

// === GET complaint analytics ===
router.get("/analytics", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "officer") {
      return res.status(403).json({ error: "Access denied" });
    }

    const statusCounts = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const categoryCounts = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const priorityCounts = await Complaint.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      statusDistribution: statusCounts,
      categoryDistribution: categoryCounts,
      priorityDistribution: priorityCounts
    });
  } catch (err) {
    console.error("❌ Error fetching complaint analytics:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;