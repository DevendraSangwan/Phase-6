const { createApp, connectDatabase } = require("../app");
const { seedDatabase } = require("../seed");
const contactRoutes = require("../routes/contactRoutes");

const port = 6000;
const app = createApp({
  routePath: "/api/contact",
  routes: contactRoutes,
  homePage: "contact.html"
});

connectDatabase()
  .then(() => seedDatabase({ connect: false, disconnectAfter: false }))
  .then(() => app.listen(port, () => {
    console.log(`Contact server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error(`Unable to start contact server: ${error.message}`);
    process.exit(1);
  });
