# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# 🎓 SkillSwap Marketplace

SkillSwap is a peer-to-peer learning platform built for university students to exchange skills, book 1-on-1 tutoring sessions, and collaborate through community-driven study circles.

## 🛠 Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons, React Router
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Tools:** ESLint, npm

## 🚀 Key Features
* **Skill Marketplace:** Discover and search for skills; filter by category and skill level.
* **Booking System:** Seamless 1-on-1 session booking with automatic credit calculation.
* **User Dashboard:** View upcoming sessions, current credit balance, and joined study circles.
* **Admin Portal:** Manage users (edit/suspend/delete), monitor platform statistics, and track system health.
* **Study Circles:** Create, join, and chat within study groups.

## ⚙️ Setup Instructions

### Prerequisites
* [Node.js]
* [PostgreSQL]

Code snippet
DATABASE_URL=postgres://1234@localhost:5432/skillcircle_db
PORT=5000

-- Create core tables
CREATE TABLE users (...);
CREATE TABLE skills (...);
CREATE TABLE sessions (...);

-- Essential setup for admin functionality
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';


Starting the Application
Start the backend server:

Bash
cd server
node server.js
Start the frontend development server:

Bash
cd client
npm run de

