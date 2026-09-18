# Student Feedback Manager

## Structure

- `app.js`: shared Express setup and MongoDB connection
- `server.js`: feedback server entry point
- `backend/`: standalone entry points for feedback, contacts, progress, and notes
- `routes/`: contact, feedback, notes, and progress API routes
- `controllers/`: CRUD logic for each resource
- `models/`: Mongoose schemas and models
- `public/`: HTML, CSS, and JavaScript files for each feature

## Run the project

Install dependencies once:

```bash
npm install
```

Create a `.env` file in the project root with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

Seed sample data once for learning/demo purposes:

```bash
npm run seed
```

Start each server in a separate terminal from the project root:

```bash
npm run feedback   # Feedback server: http://localhost:5000
npm run contact    # Contact server: http://localhost:6000
npm run progress   # Progress server: http://localhost:7000
npm run notes      # Notes server: http://localhost:8000
```

All four servers must be running for every feature to work.

Open these pages in your browser:

- Feedback form: `http://localhost:5000/` or `http://localhost:5000/feedback.html`
- View all feedback: `http://localhost:5000/view-feedback.html`
- Contacts: `http://localhost:6000/contact.html` or `http://localhost:6000/view-contacts.html`
- Progress: `http://localhost:7000/progress.html` or `http://localhost:7000/view-progress.html`
- Notes: `http://localhost:8000/note.html` or `http://localhost:8000/view-notes.html`

`npm start` starts only the feedback server on port `5000`.

The API endpoints are:

- Feedback: `/api/feedback`
- Contacts: `/api/contact`
- Notes: `/api/notes`
- Progress: `/api/progress`

Each resource supports `POST`, `GET`, `PUT /:id`, and `DELETE` on its API path.