const { createApp, connectDatabase } = require("../app");
const { seedDatabase } = require("../seed");
const notesRoutes = require("../routes/notesRoutes");

const port = Number(process.env.NOTES_PORT || process.env.PORT || 8001);
const app = createApp({
  routePath: "/api/notes",
  routes: notesRoutes,
  homePage: "note.html"
});

connectDatabase()
  .then(() => seedDatabase({ disconnectAfter: false }))
  .then(() => app.listen(port, () => {
    console.log(`Notes server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error(`Unable to start notes server: ${error.message}`);
    process.exit(1);
  });
