# 🎉 Event Planner Web App

A full-stack web application that allows users to create, manage, and RSVP to events. Admins can add/edit/delete events, while users can RSVP and view their RSVP history.

---

## 🔧 Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Hosting**:
  - Code: GitHub
  - Backend: [Render](https://render.com) or [Cyclic](https://www.cyclic.sh/)
  - Frontend: [Netlify](https://netlify.com) or [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### ✅ Clone the Repository

```bash
git clone https://github.com/your-username/Event-Planner.git
cd Event-Planner

🖥️ Run the Frontend
```bash

cd Frontend
npm install
npm run dev

⚙️ Run the Backend
```bash

cd Backend
npm install
npm run dev

Make sure you create a .env file inside /Backend with the following variables:

env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📦 Features
🧑 Role-based access control (Admin & User)

📝 Admin: Create, Edit, Delete Events

📅 Users: RSVP to events (Going / Maybe / Declined)

🔐 Secure login & registration with password hashing

📊 RSVP summary for Admin

👤 User dashboard with RSVP history

🌍 Deployment Instructions
🔷 Backend (Render or Cyclic)
Push your backend to a GitHub repo.

Go to Render → New Web Service

Connect your repo and select the Backend folder.

Add environment variables (MONGO_URI, JWT_SECRET)

Set build/start command as: npm install && node server.js

🔶 Frontend (Netlify or Vercel)
Go to Vercel or Netlify

Connect your GitHub → Select the Frontend folder

Set:

Build command: npm run build

Output directory: dist


📬 Feedback
Feel free to open an Issue if you find bugs or want to suggest improvements!

📝 Commit Guidelines
Use meaningful commit messages:

bash

git add .
git commit -m "Fix: RSVP status not updating"
git push
