const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

const internships = [
  {
    id: "full-stack-developer-intern",
    title: "Full Stack Developer Intern",
    company: "TechNova Solutions",
    location: "Remote",
    duration: "3 months",
    stipend: "Rs. 15,000 / month",
    symbol: "FS",
    skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    description:
      "Build and maintain features across the MERN stack for a student-focused internship platform.",
    responsibilities: [
      "Develop responsive React components and pages",
      "Implement Express REST APIs and integrate MongoDB",
      "Collaborate on debugging, testing, and code reviews",
    ],
    requirements: [
      "Basic knowledge of JavaScript and React",
      "Understanding of REST APIs and databases",
      "Good problem-solving and communication skills",
    ],
  },
  {
    id: "data-science-intern",
    title: "Data Science Intern",
    company: "Insight Analytics",
    location: "Hybrid",
    duration: "4 months",
    stipend: "Rs. 18,000 / month",
    symbol: "DS",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning", "SQL"],
    description:
      "Analyze real-world datasets and create insights that improve product and business decisions.",
    responsibilities: [
      "Clean and explore datasets using Python",
      "Build predictive models and evaluate performance",
      "Present findings through dashboards and reports",
    ],
    requirements: [
      "Familiarity with Python and data analysis",
      "Basic statistics and machine learning concepts",
      "Experience with SQL is a plus",
    ],
  },
  {
    id: "ai-ml-intern",
    title: "AI/ML Intern",
    company: "NeuroForge AI",
    location: "On-site",
    duration: "6 months",
    stipend: "Rs. 20,000 / month",
    symbol: "AI",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Deep Learning"],
    description:
      "Work on intelligent features such as recommendation and text classification models.",
    responsibilities: [
      "Train and evaluate machine learning models",
      "Prepare datasets and improve model accuracy",
      "Integrate ML models into application workflows",
    ],
    requirements: [
      "Strong Python programming skills",
      "Understanding of ML algorithms",
      "Interest in AI research and experimentation",
    ],
  },
  {
    id: "cybersecurity-intern",
    title: "Cybersecurity Intern",
    company: "ShieldSecure",
    location: "Remote",
    duration: "3 months",
    stipend: "Rs. 16,000 / month",
    symbol: "CS",
    skills: ["Network Security", "Linux", "OWASP", "Vulnerability Assessment"],
    description:
      "Assist in identifying security risks and improving application and infrastructure security.",
    responsibilities: [
      "Perform basic vulnerability scans and reviews",
      "Document security findings and remediation steps",
      "Support secure coding practices",
    ],
    requirements: [
      "Basic networking and Linux knowledge",
      "Awareness of common web vulnerabilities",
      "Attention to detail and confidentiality",
    ],
  },
  {
    id: "cloud-computing-intern",
    title: "Cloud Computing Intern",
    company: "SkyScale Cloud",
    location: "Hybrid",
    duration: "4 months",
    stipend: "Rs. 17,000 / month",
    symbol: "CC",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
    description:
      "Deploy and monitor cloud-native applications while learning modern DevOps practices.",
    responsibilities: [
      "Containerize applications with Docker",
      "Deploy services to cloud environments",
      "Monitor logs, metrics, and uptime",
    ],
    requirements: [
      "Basic Linux and networking knowledge",
      "Understanding of virtualization and cloud concepts",
      "Willingness to learn DevOps tools",
    ],
  },
  {
    id: "ui-ux-design-intern",
    title: "UI/UX Design Intern",
    company: "PixelCraft Studio",
    location: "On-site",
    duration: "3 months",
    stipend: "Rs. 14,000 / month",
    symbol: "UX",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems"],
    description:
      "Design intuitive user experiences and polished interfaces for web applications.",
    responsibilities: [
      "Create wireframes and interactive prototypes",
      "Conduct usability reviews and improve flows",
      "Collaborate with developers for implementation",
    ],
    requirements: [
      "Basic understanding of UI/UX principles",
      "Figma or similar design tool experience",
      "Creative and detail-oriented mindset",
    ],
  },
];

const allowedInternships = internships.map((item) => item.title);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Student Internship Portal API is running",
  });
});

router.get("/internships", (req, res) => {
  res.status(200).json({
    success: true,
    count: internships.length,
    internships,
  });
});

router.get("/internships/:id", (req, res) => {
  const internship = internships.find((item) => item.id === req.params.id);

  if (!internship) {
    return res.status(404).json({
      success: false,
      message: "Internship not found",
    });
  }

  return res.status(200).json({
    success: true,
    internship,
  });
});

router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve applications",
    });
  }
});

router.post("/applications", async (req, res) => {
  try {
    const { studentName, email, rollNumber, internship } = req.body;

    if (
      typeof studentName !== "string" ||
      typeof email !== "string" ||
      typeof rollNumber !== "string" ||
      typeof internship !== "string" ||
      !studentName.trim() ||
      !email.trim() ||
      !rollNumber.trim() ||
      !internship.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (studentName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least two characters",
      });
    }

    if (!allowedInternships.includes(internship)) {
      return res.status(400).json({
        success: false,
        message: "Select a valid internship",
      });
    }

    const application = await Application.create({
      studentName: studentName.trim(),
      email: email.trim(),
      rollNumber: rollNumber.trim(),
      internship,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This roll number has already applied for this internship.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Submit application:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit the application. Please try again.",
    });
  }
});

module.exports = router;
