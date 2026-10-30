
const express = require("express");
const router = express.Router();

const Application = require("../models/application");

// Available internships
const internships = [
  {
    id: "1",
    title: "Full Stack Web Development",
    company: "Tech Solutions",
    location: "Coimbatore",
    duration: "3 Months",
    type: "Remote",
    description:
      "Work on frontend and backend development using React, Node.js, Express and MongoDB.",
    skills: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Data Analytics Ltd",
    location: "Bangalore",
    duration: "2 Months",
    type: "Hybrid",
    description:
      "Learn data analysis, visualization and machine learning through practical projects.",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"]
  },
  {
    id: "3",
    title: "Artificial Intelligence Intern",
    company: "AI Innovations",
    location: "Remote",
    duration: "3 Months",
    type: "Remote",
    description:
      "Develop AI applications and work with machine learning models and intelligent systems.",
    skills: ["Python", "AI", "ML", "TensorFlow"]
  },
  {
    id: "4",
    title: "Cyber Security Intern",
    company: "Secure Systems",
    location: "Chennai",
    duration: "2 Months",
    type: "On-site",
    description:
      "Understand network security, vulnerability assessment and security testing.",
    skills: ["Networking", "Linux", "Security", "Python"]
  }
];

// GET: Retrieve all internships
router.get("/internships", (req, res) => {
  res.json(internships);
});

// GET: Retrieve internship by ID
router.get("/internships/:id", (req, res) => {
  const internship = internships.find(
    (item) => item.id === req.params.id
  );

  if (!internship) {
    return res.status(404).json({
      message: "Internship not found"
    });
  }

  res.json(internship);
});

// POST: Submit student application
router.post("/applications", async (req, res) => {
  try {
    const { name, email, rollNumber, internship } = req.body;

    if (
      !name ||
      !email ||
      !rollNumber ||
      !internship
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address"
      });
    }

    const application = new Application({
      name,
      email,
      rollNumber,
      internship
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to submit application",
      error: err.message
    });
  }
});

// GET: Retrieve all submitted applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1
    });

    res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve applications",
      error: err.message
    });
  }
});

module.exports = router;
