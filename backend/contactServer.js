const { createApp, connectDatabase } = require("../app");
const contactRoutes = require("../routes/contactRoutes");

const port = 4000;
const app = createApp({
  routePath: "/api/contact",
  routes: contactRoutes,
  homePage: "contact.html"
});

connectDatabase()
  .then(() => app.listen(port, () => {
    console.log(`Contact server running at http://localhost:${port}`);
  }))
  .catch((error) => {
    console.error(`Unable to start contact server: ${error.message}`);
    process.exit(1);
  });
