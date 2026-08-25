const { app, connectDatabase } = require("../app");

const port = process.env.FEEDBACK_PORT || 4000;

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
