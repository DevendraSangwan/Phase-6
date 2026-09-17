const { createApp, connectDatabase } = require("../app");
const { seedDatabase } = require("../seed");
const progressRoutes = require("../routes/progressRoutes");

const port = 7000;
const app = createApp({
  routePath: "/api/progress",
  routes: progressRoutes,
  homePage: "progress.html"
});

connectDatabase()
  .then(() => seedDatabase({ connect: false, disconnectAfter: false }))
  .then(() => app.listen(port, () => {
    console.log(`Progress server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error(`Unable to start progress server: ${error.message}`);
    process.exit(1);
  });
