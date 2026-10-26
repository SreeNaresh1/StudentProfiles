require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Internship Portal API",
    endpoints: {
      health: "/api/health",
      applications: "/api/applications",
    },
  });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

async function startServer() {
  try {
    const mongoUri =
      process.env.MONGO_DB_URI ||
      process.env.MONGO_URI ||
      process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB connection string is missing from .env");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();