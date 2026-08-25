# Student Feedback Manager

## Structure

- `app.js`: Express middleware, static files, database connection, and route mounting
- `server.js`: application entry point
- `routes/feedbackRoutes.js`: feedback API routes
- `controllers/feedbackController.js`: feedback CRUD logic
- `models/Feedback.js`: Mongoose schema and model
- `public/`: feedback form and all-feedback page

## Start the project

1. Install dependencies once:

   ```bash
   npm install
   ```

2. Create `.env` in the project root and set `MONGODB_URI` and `PORT`.

3. Start the app:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000/` for the form or `http://localhost:3000/feedback.html` to view feedback.

The API endpoints are `POST /api/feedback`, `GET /api/feedback`, `PUT /api/feedback/:id`, and `DELETE /api/feedback`.