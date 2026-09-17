require("dotenv").config();

const mongoose = require("mongoose");
const Contact = require("./models/Contact");
const Feedback = require("./models/Feedback");
const Notes = require("./models/Notes");
const Progress = require("./models/Progress");

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

const sampleData = {
  Contact: [
    {
      name: "Ali Khan",
      email: "ali.khan@example.com",
      message: "I want to know more about the course pricing and schedule.",
      submissionDate: new Date("2026-08-15T10:00:00Z")
    },
    {
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      message: "Please share the next workshop details for frontend development.",
      submissionDate: new Date("2026-08-16T14:30:00Z")
    },
    {
      name: "Usman Tariq",
      email: "usman.tariq@example.com",
      message: "I would like to register for the web development bootcamp.",
      submissionDate: new Date("2026-08-18T09:45:00Z")
    }
  ],
  Feedback: [
    {
      name: "Huma",
      rating: 5,
      comment: "The platform is very easy to understand and the lessons are practical."
    },
    {
      name: "Zain",
      rating: 4,
      comment: "Great content and smooth experience. I would like more advanced examples."
    },
    {
      name: "Ayesha",
      rating: 5,
      comment: "Excellent support and a very motivating learning flow."
    }
  ],
  Notes: [
    {
      title: "JavaScript Basics",
      content: "Review variables, arrays, objects, and functions before moving to DOM events.",
      createAt: new Date("2026-08-10T08:00:00Z")
    },
    {
      title: "Project Checklist",
      content: "Finish dashboard UI, connect API routes, and test CRUD operations on all modules.",
      createAt: new Date("2026-08-12T11:15:00Z")
    },
    {
      title: "Exam Preparation",
      content: "Practice from the previous five questions and revise all important topics again.",
      createAt: new Date("2026-08-14T13:40:00Z")
    }
  ],
  Progress: [
    {
      studentName: "Areeba",
      courseName: "Full Stack Development",
      completionPercentage: 78,
      lastUpdated: new Date("2026-08-19T12:00:00Z")
    },
    {
      studentName: "Musa",
      courseName: "Frontend Development",
      completionPercentage: 86,
      lastUpdated: new Date("2026-08-20T15:30:00Z")
    },
    {
      studentName: "Nadia",
      courseName: "Backend Development",
      completionPercentage: 64,
      lastUpdated: new Date("2026-08-21T09:20:00Z")
    }
  ]
};

async function seedDatabase(options = {}) {
  const { disconnectAfter = true, connect = true } = options;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  if (connect && mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }

  const seedTasks = [
    { model: Contact, label: "Contact", docs: sampleData.Contact },
    { model: Feedback, label: "Feedback", docs: sampleData.Feedback },
    { model: Notes, label: "Notes", docs: sampleData.Notes },
    { model: Progress, label: "Progress", docs: sampleData.Progress }
  ];

  for (const { model, label, docs } of seedTasks) {
    const existingCount = await model.countDocuments();

    if (existingCount === 0) {
      await model.insertMany(docs);
      console.log(`${label} seed data added successfully.`);
    } else {
      console.log(`${label} already has data. Skipping seed.`);
    }
  }

  if (disconnectAfter) {
    await mongoose.disconnect();
  }
}

module.exports = { seedDatabase, sampleData };

if (require.main === module) {
  seedDatabase()
    .then(() => console.log("Database seeding completed."))
    .catch((error) => {
      console.error("Seed failed:", error.message);
      process.exit(1);
    });
}
