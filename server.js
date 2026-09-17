const { createApp, connectDatabase } = require("./app");
const { seedDatabase } = require("./seed");
const feedbackRoutes = require("./routes/feedbackRoutes");

const port = 5000;
const app = createApp({
  routePath: "/api/feedback",
  routes: feedbackRoutes,
  homePage: "index.html"
});

connectDatabase()
  .then(() => seedDatabase({ connect: false, disconnectAfter: false }))
  .then(() => {
    app.listen(port, () => {
      console.log(`Student Feedback Manager running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  });
