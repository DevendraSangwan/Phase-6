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
MONGODB_DATABASE=Phase-6
```

All app servers and the seed script use the `Phase-6` database by default. `MONGODB_DATABASE` can override the database name; it takes precedence over any database name in `MONGODB_URI`.

Seed sample data once for learning/demo purposes:

```bash
npm run seed
```

Start the dashboard and all four projects together:

```bash
npm start
```

Open `http://localhost:5001` to see the project dashboard. Use its buttons to open Feedback, Contacts, Progress, or Notes. All projects and their APIs are available from this server, backed by the same `Phase-6` database.

For standalone development, each project can still be started separately in its own terminal:

```bash
npm run feedback   # Feedback server: http://localhost:5001
npm run contact    # Contact server: http://localhost:6001
npm run progress   # Progress server: http://localhost:7001
npm run notes      # Notes server: http://localhost:8001
```

Open these pages in your browser:

- Feedback form: `http://localhost:5001/` or `http://localhost:5001/feedback.html`
- View all feedback: `http://localhost:5001/view-feedback.html`
- Contacts: `http://localhost:6000/contact.html` or `http://localhost:6000/view-contacts.html`
- Progress: `http://localhost:7000/progress.html` or `http://localhost:7000/view-progress.html`
- Notes: `http://localhost:8000/note.html` or `http://localhost:8000/view-notes.html`

`npm start` starts the dashboard and all four projects on port `5001`.

The API endpoints are:

- Feedback: `/api/feedback`
- Contacts: `/api/contact`
- Notes: `/api/notes`
- Progress: `/api/progress`

Each resource supports `POST`, `GET`, `PUT /:id`, and `DELETE` on its API path.

## Deploy frontend and backend separately

The Render Blueprint in `render.yaml` runs the API server. Create the Render web service from this repository and set `MONGODB_URI` to the MongoDB connection string in Render's environment settings. Keep `MONGODB_DATABASE` set to `Phase-6`; do not commit `.env` or put the MongoDB URI in the frontend.

The Netlify configuration in `netlify.toml` publishes the `public/` directory. After Render deploys, open `public/api-config.js` and set `PHASE6_API_BASE_URL` to the Render service URL, for example `https://phase-6-api.onrender.com` (no trailing slash). Commit and push that change, then deploy the site on Netlify from the same repository.

For Atlas, allow connections from the Render service in Network Access. For production, use Render static outbound IPs when available and allowlist those IPs in Atlas; avoid opening database network access to everyone unless you understand and accept the risk.

## Project Workflow

### 1) Feedback Project
- Frontend form: `public/feedback.html`
- Form logic: `public/feedback.js`
- Model: `models/Feedback.js`
- Controller: `controllers/feedbackController.js`
- Route: `routes/feedbackRoutes.js`
- Server: `backend/feedbackServer.js`
- Flow: user fills form -> `feedback.js` sends data to `/api/feedback` -> route calls controller -> controller uses `Feedback` model -> MongoDB stores the feedback -> server listens on port `5001`.

### 2) Contact Project
- Frontend page: `public/contact.html`
- Form/view logic: `public/contact.js`
- Model: `models/Contact.js`
- Controller: `controllers/contactController.js`
- Route: `routes/contactRoutes.js`
- Server: `backend/contactServer.js`
- Flow: user submits or views contact data -> `contact.js` hits `/api/contact` -> route -> controller -> model -> MongoDB -> display on page.

### 3) Notes Project
- Frontend page: `public/note.html`
- Script: `public/note.js`
- Model: `models/Notes.js`
- Controller: `controllers/notesController.js`
- Route: `routes/notesRoutes.js`
- Server: `backend/notesServer.js`
- Flow: user adds or reads notes -> `note.js` sends API request -> route -> controller -> `Notes` model -> database -> response shown on UI.

### 4) Progress Project
- Frontend page: `public/progress.html`
- Script: `public/progress.js`
- Model: `models/Progress.js`
- Controller: `controllers/progressController.js`
- Route: `routes/progressRoutes.js`
- Server: `backend/progressServer.js`
- Flow: user enters student progress -> frontend sends data to `/api/progress` -> route -> controller -> `Progress` model -> MongoDB -> result displayed on page.

### Shared setup
- Common app config: `app.js`
- Database connection: `connectDatabase()` in `app.js`
- Seed data: `seed.js`
- Root server entry: `server.js`
