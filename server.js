const { app, connectDatabase } = require("./app");

const port = process.env.PORT || 3000;

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




  