const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 30,
    },
    internship: {
      type: String,
      required: true,
      enum: [
        "Full Stack Developer Intern",
        "Data Science Intern",
        "AI/ML Intern",
        "Cybersecurity Intern",
        "Cloud Computing Intern",
        "UI/UX Design Intern",
      ],
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications for the same role.
applicationSchema.index(
  { rollNumber: 1, internship: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);