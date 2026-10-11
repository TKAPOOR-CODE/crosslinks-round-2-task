# NSUT Connect (Frontend Track)

Community platform for NSUT students built with React + Vite. All data is dummy data stored in `src/data/data.js` (no backend or database needed).

## Pages
- Login: dummy Google sign-in, only `@nsut.ac.in` emails accepted, Student / Admin role
- Feed: create posts, like, filter by topic, today's classes and pinned notices
- Discussions: search, filter, create threads, reply, upvote
- Announcements: category filter; admins can publish, pin and delete
- Timetable: weekly grid and day view, highlights today and the ongoing class
- Profile: edit details, stats, logout

## Run locally
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Build
```bash
npm run build
```

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. Import the repo on vercel.com, keep defaults (Framework: Vite), click Deploy.

Routing uses `HashRouter`, so refreshes work on any static host.
