const { createApp, connectDatabase } = require("./app");
const feedbackRoutes = require("./routes/feedbackRoutes");

const port = 3000;
const app = createApp({
  routePath: "/api/feedback",
  routes: feedbackRoutes,
  homePage: "index.html"
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Student Feedback Manager running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  });
