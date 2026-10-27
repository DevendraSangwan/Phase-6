const { createApp, connectDatabase } = require("./app");
const { seedDatabase } = require("./seed");
const contactRoutes = require("./routes/contactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const notesRoutes = require("./routes/notesRoutes");
const progressRoutes = require("./routes/progressRoutes");

const port = Number(process.env.PORT || process.env.FEEDBACK_PORT || 5001);
const app = createApp({
  homePage: "index.html",
  routeMounts: [
    { path: "/api/feedback", router: feedbackRoutes },
    { path: "/api/contact", router: contactRoutes },
    { path: "/api/progress", router: progressRoutes },
    { path: "/api/notes", router: notesRoutes }
  ]
});

connectDatabase()
  .then(() => seedDatabase({ connect: false, disconnectAfter: false }))
  .then(() => {
    app.listen(port, () => {
      console.log(`Phase-6 project dashboard running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  });
