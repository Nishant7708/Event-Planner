#  Event Planner Web App

A full-stack web application that allows users to create, manage, and RSVP to events. Admins can add/edit/delete events, while users can RSVP and view their RSVP history.

---

##  Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Hosting**:
  - Code: GitHub

---

##  Getting Started

###  Clone the Repository

```bash
git clone https://github.com/Nishant7708/Event-Planner.git
cd Event-Planner

 Run the Frontend
```bash

cd Frontend
npm install
npm run dev

 Run the Backend
```bash

cd Backend
npm install
npm run dev

Make sure you create a .env file inside /Backend with the following variables:

env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

 Features
 Role-based access control (Admin & User)

 Admin: Create, Edit, Delete Events

 Users: RSVP to events (Going / Maybe / Declined)

 Secure login & registration with password hashing

 RSVP summary for Admin

 User dashboard with RSVP history




 Feedback
Feel free to open an Issue if you find bugs or want to suggest improvements!

 Commit Guidelines
Use meaningful commit messages:

bash

git add .
git commit -m "Fix: RSVP status not updating"
git push
