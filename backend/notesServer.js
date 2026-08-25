const { createApp, connectDatabase } = require("../app");
const notesRoutes = require("../routes/notesRoutes");

const port = 7000;
const app = createApp({
  routePath: "/api/notes",
  routes: notesRoutes,
  homePage: "note.html"
});

connectDatabase()
  .then(() => app.listen(port, () => {
    console.log(`Notes server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error(`Unable to start notes server: ${error.message}`);
    process.exit(1);
  });
