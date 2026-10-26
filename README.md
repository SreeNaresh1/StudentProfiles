# Student Internship Portal

A MERN stack application that displays available internships, lets students view role details, and submit applications with validation.

## Tech Stack
- MongoDB
- Express.js
- React
- Node.js

## Project Structure
- `index.js` - Express server and MongoDB connection
- `routes/api.js` - REST API endpoints
- `models/Application.js` - Mongoose schema
- `client/` - React frontend

## Environment Variables
Create a `.env` file in the project root:

```env
MONGO_DB_URI=mongodb://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>
PORT=5000
```

For the frontend, set this environment variable when deploying:

```env
VITE_API_URL=https://your-backend-url.com
```

## Installation

```bash
npm install
npm run setup
```

## Run Locally

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints
- `GET /api/health`
- `GET /api/internships`
- `GET /api/internships/:id`
- `GET /api/applications`
- `POST /api/applications`

## Git Workflow

```bash
git checkout -b rollno_v1
git add .
git commit -m "Develop Student Internship Portal"
git checkout main
git merge rollno_v1
git push origin main
```

## Deployment
- Frontend: deploy the `client` folder to Vercel and set `VITE_API_URL`.
- Backend: deploy the Node.js server to Render, Railway, or another Node hosting platform and set `MONGO_DB_URI` and `PORT`.
