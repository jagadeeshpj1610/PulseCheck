# PulseCheck

PulseCheck is an API monitoring platform that tracks the uptime and response time of your APIs and alerts you when they go down.

> **Status:** Sprint 1: auth done (register, login, JWT, protected routes). Monitors are next.

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
psql -U postgres -d pulsecheck -f server/db002_create_monitors_table.sql
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

```bash
cd client
npm install
```

Create the env file (PowerShell):

```powershell
Copy-Item .env.example .env
```

Set `VITE_API_URL=http://localhost:8000`, then:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## Server Environment Variables

Defined in `server/.env` (never commit this file). Use `server/.env.example` as the template.

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `PORT`           | Port the backend listens on        |
| `DB_HOST`        | PostgreSQL host (e.g. `localhost`) |
| `DB_PORT`        | PostgreSQL port (default `5432`)   |
| `DB_USER`        | PostgreSQL user                    |
| `DB_PASSWORD`    | PostgreSQL password                |
| `DB_NAME`        | Database name (`pulsecheck`)       |
| `JWT_SECRET`     | Reserved for future authentication |
| `JWT_EXPIRES_IN` | Token lifetime (default `1h`)      |

## Client Environment

| Variable       | Description                                       |
| -------------- | ------------------------------------------------- |
| `VITE_API_URL` | Backend base URL (public, never put secrets here) |

## Project Structure

```
PulseCheck/
├── client/              React frontend (Vite)
│   └── src/
│       ├── components/  ProtectedRoute
│       ├── context/     AuthContext
│       ├── pages/       Login, Register, Dashboard
│       └── services/    api (axios), authService
└── server/              Express backend
    ├── config/          Env config and DB connection
    ├── controllers/
    ├── db/              SQL migrations
    ├── middleware/      JWT verification
    ├── routes/
    ├── services/
    ├── validators/
    └── server.js
```
    
## Scripts

| Location  | Command       | Purpose                           |
| --------- | ------------- | --------------------------------- |
| `server/` | `npm run dev` | Start with auto-restart (nodemon) |
| `server/` | `npm start`   | Start with plain Node             |
| `client/` | `npm run dev` | Start the Vite dev server         |

## Auth Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (requires `Authorization: Bearer <token>`)

Logout is client-side in V1: the client deletes the token.