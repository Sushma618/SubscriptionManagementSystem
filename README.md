# LUMEN Quest 2.0 – Subscription Management System

A modern full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing broadband subscriptions with user/admin dashboards, analytics, and recommendations.

## Project Structure
- `/frontend` – React.js + Tailwind CSS + Redux Toolkit + React Router
- `/backend` – Node.js + Express.js REST API, Mongoose, RBAC, analytics, notifications
- `/database` – MongoDB seed data (users, plans, subscriptions, logs)

## Features
- User: Browse, subscribe, upgrade/downgrade, cancel, renew plans; view recommendations; receive notifications
- Admin: Manage plans/pricing/discounts, analytics dashboard, optimize plans/discounts, audit logs
- Analytics: Active/cancelled, popular plans, trends, churn prediction (mocked)
- Security: RBAC, basic authentication (simulated), sensitive data encryption

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Backend Setup
```
cd backend
npm install
# Create a .env file with:
# MONGO_URI=mongodb://localhost:27017/lumen_quest
# JWT_SECRET=your_jwt_secret
npm run dev
```

### 2. Frontend Setup
```
cd frontend
npm install
npm start
```

### 3. Database Seed
```
cd database
npm install bcryptjs mongoose dotenv
node seed.js
```

### 4. Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Example Accounts
- Admin: admin@example.com / password123
- User: user@example.com / password123

## Usage
- Login as admin or user to access respective dashboards.
- Admins can manage plans, view analytics, and manage discounts.
- Users can browse plans, subscribe, upgrade/downgrade, cancel, renew, and view recommendations.

## Tech Stack
- React.js, Tailwind CSS, Redux Toolkit, React Router
- Node.js, Express.js, Mongoose
- MongoDB
- Chart.js or Recharts (analytics)

## License
MIT
