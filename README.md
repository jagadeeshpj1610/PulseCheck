# PulseCheck

PulseCheck is an API monitoring platform that tracks the uptime and response time of your APIs and alerts you when they go down.

> **Status:** Sprint 1 in progress. Day 2 : User can able to Register/signUp using his/her details.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## Prerequisites

- Node.js (use the latest LTS) and npm
- PostgreSQL installed and running

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PulseCheck
```

### 2. Create the database

Open `psql` and run:

```sql
CREATE DATABASE pulsecheck;
```

### 2. Set up the database

```bash
psql -U postgres -c "CREATE DATABASE pulsecheck;"
psql -U postgres -d pulsecheck -f server/db/001_create_users_table.sql
```

### 3. Run the backend

```bash
cd server
npm install
```

Create your environment file from the template (PowerShell):

```powershell
Copy-Item .env.example .env
```

Fill in the values in `.env`, then start the server:

```bash
npm run dev
```

The API runs on `http://localhost:8000` (or the `PORT` you set).

### 4. Run the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## Environment Variables

Defined in `server/.env` (never commit this file). Use `server/.env.example` as the template.

| Variable | Description |
|---|---|
| `PORT` | Port the backend listens on |
| `DB_HOST` | PostgreSQL host (e.g. `localhost`) |
| `DB_PORT` | PostgreSQL port (default `5432`) |
| `DB_USER` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_NAME` | Database name (`pulsecheck`) |
| `JWT_SECRET` | Reserved for future authentication |

## Project Structure

```
PulseCheck/
├── client/          React frontend (Vite)
└── server/          Express backend
    ├── config/      Environment config and database connection
    └── server.js    App entry point
```
```
server/
├── config/        Env config and DB connection
├── controllers/
├── db/            SQL migrations
├── routes/
├── services/
├── validators/
└── server.js
```
## Scripts

| Location | Command | Purpose |
|---|---|---|
| `server/` | `npm run dev` | Start with auto-restart (nodemon) |
| `server/` | `npm start` | Start with plain Node |
| `client/` | `npm run dev` | Start the Vite dev server |