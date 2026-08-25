const { createApp, connectDatabase } = require("../app");
const feedbackRoutes = require("../routes/feedbackRoutes");

const port = 3000;
const app = createApp({
  routePath: "/api/feedback",
  routes: feedbackRoutes,
  homePage: "index.html"
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Feedback server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to start feedback server: ${error.message}`);
    process.exit(1);
  });
