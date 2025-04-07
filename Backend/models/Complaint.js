const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    subject: String,
    description: String,
    category: String,
    submittedBy: String,
    supportingDoc: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "resolved"],
      default: "pending"
    },
    adminNote: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);