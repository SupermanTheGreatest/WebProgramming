<div align="center">

<img src="https://img.shields.io/badge/TrialBridge-v1.0.0-4F46E5?style=for-the-badge&logo=react" alt="TrialBridge"/>

# 🧬 TrialBridge

### *Bridging Groundbreaking Medical Research with the People Who Need It*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

> **Semester 4 Mini Project — Web Programming**  
> Thadomal Shahani Engineering College

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture & Design](#-architecture--design)
- [Module Breakdown](#-module-breakdown)
- [APIs Used / Integrated](#-apis-used--integrated)
- [App Flow & Screenshots](#-app-flow--screenshots)
- [Challenges Faced](#-challenges-faced)
- [Team Contributions](#-team-contributions)
- [Getting Started](#-getting-started)

---

## 🔬 Overview

**TrialBridge** is a modern, full-stack web platform designed to eliminate the friction between medical research and patient participation. Clinical trials are the backbone of medical progress — yet historically, connecting the right patients with the right trials has been a fragmented, jargon-heavy, and painfully manual process.

TrialBridge solves this with a clean, dual-sided platform:

| 👤 For Patients | 🏥 For Researchers |
|---|---|
| Discover active clinical trials using a simple, filter-driven search interface | List and manage clinical studies to accelerate participant recruitment |
| Read plain-language summaries instead of dense medical PDFs | Connect directly with eligible, interested participants |
| Register interest or apply with a single click | Track applicant details and study status from a dashboard |
| No medical background required to navigate | Showcase credibility with structured, professional study profiles |

> *"TrialBridge is the digital bridge connecting groundbreaking medical research with the patients who can benefit from it."*

---

## ✨ Features

### Patient-Side
- 🔍 **Smart Trial Search** — Filter by condition, phase, location, and eligibility criteria
- 📄 **Plain-Language Summaries** — Medical jargon translated into readable descriptions
- 📬 **One-Click Registration** — Express interest or apply directly from the trial card
- 👤 **Patient Dashboard** — Track all applied and bookmarked trials in one place
- 🔔 **Status Notifications** — Get updates on application and trial progress

### Researcher-Side
- 📝 **Trial Listing Portal** — Create and publish clinical study profiles
- 📊 **Applicant Management** — View and manage a list of interested participants
- ✏️ **Edit & Update Studies** — Keep trial status (recruiting, completed, closed) current
- 🔒 **Secure Researcher Authentication** — Role-based access control for investigators

### Platform-Wide
- 🌐 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- 🔐 **JWT Authentication** — Secure, token-based login for both user types
- 🌙 **Dark / Light Mode** — Accessibility-focused theme toggle

---

## 🏗 Architecture & Design

TrialBridge follows a **3-Tier MERN Stack Architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│           React.js SPA (Vite + Tailwind CSS)            │
│   Patient UI   │   Researcher UI   │   Auth Pages       │
└─────────────────────────┬───────────────────────────────┘
                          │ REST API (JSON over HTTP)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    SERVER LAYER                         │
│              Node.js + Express.js                       │
│   Auth Routes  │  Trial Routes  │  User Routes          │
│         JWT Middleware + Role Guard                     │
└─────────────────────────┬───────────────────────────────┘
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                        │
│             MongoDB Atlas (Cloud)                       │
│   Users   │   Trials   │   Applications   │   Sessions  │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns Used

| Pattern | Implementation |
|---|---|
| **MVC** | Express routes → Controllers → Mongoose Models |
| **RESTful API** | Standard HTTP verbs (GET, POST, PUT, DELETE) |
| **SPA** | React Router for client-side navigation |
| **Component-Based UI** | Reusable React components across pages |
| **Role-Based Access Control** | Middleware separates Patient vs Researcher permissions |

---

## 🧩 Module Breakdown

### Frontend (`/client`)

```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── TrialCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   └── ApplicationModal.jsx
│   ├── pages/              # Route-level page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── TrialSearch.jsx # Patient search interface
│   │   ├── TrialDetail.jsx # Individual trial page
│   │   ├── Dashboard.jsx   # Patient/researcher dashboard
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── PostTrial.jsx   # Researcher: create trial
│   ├── context/            # React Context for global state
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom hooks
│   └── utils/              # API call helpers (axios)
```

### Backend (`/server`)

```
server/
├── controllers/
│   ├── authController.js       # Register, login, JWT issue
│   ├── trialController.js      # CRUD for clinical trials
│   └── applicationController.js # Patient applications
├── models/
│   ├── User.js                 # Schema: patient & researcher
│   ├── Trial.js                # Schema: clinical trial
│   └── Application.js          # Schema: patient → trial link
├── routes/
│   ├── authRoutes.js
│   ├── trialRoutes.js
│   └── applicationRoutes.js
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   └── roleMiddleware.js        # Role guard (patient/researcher)
└── server.js                   # Entry point, Express setup
```

### Database Schema Overview

**User**
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "patient | researcher",
  "createdAt": "Date"
}
```

**Trial**
```json
{
  "_id": "ObjectId",
  "title": "String",
  "condition": "String",
  "phase": "Phase I | II | III | IV",
  "location": "String",
  "status": "recruiting | completed | closed",
  "description": "String",
  "eligibilityCriteria": "String",
  "postedBy": "ObjectId (ref: User)",
  "createdAt": "Date"
}
```

**Application**
```json
{
  "_id": "ObjectId",
  "patient": "ObjectId (ref: User)",
  "trial": "ObjectId (ref: Trial)",
  "status": "pending | accepted | rejected",
  "appliedAt": "Date"
}
```

---

## 🔌 APIs Used / Integrated

| API / Service | Purpose |
|---|---|
| **ClinicalTrials.gov API** | Seed real-world clinical trial data for demonstration; augments platform content |
| **MongoDB Atlas** | Cloud-hosted NoSQL database with automatic scaling and backups |
| **JWT (jsonwebtoken)** | Stateless authentication tokens for secure, role-based access |
| **bcrypt.js** | Password hashing before storage — never store plaintext passwords |
| **Axios** | HTTP client used in the React frontend to call backend REST endpoints |
| **Cloudinary** *(optional)* | If researchers upload study-related images or documents |
| **Nodemailer** | Email notifications to patients on application status change |

### Internal REST API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register as patient or researcher |
| `POST` | `/api/auth/login` | None | Login and receive JWT |
| `GET` | `/api/trials` | None | List all active trials (supports filters) |
| `GET` | `/api/trials/:id` | None | Get a single trial's full details |
| `POST` | `/api/trials` | Researcher | Create a new clinical trial listing |
| `PUT` | `/api/trials/:id` | Researcher (owner) | Update trial info or status |
| `DELETE` | `/api/trials/:id` | Researcher (owner) | Remove a trial listing |
| `POST` | `/api/applications` | Patient | Apply to a clinical trial |
| `GET` | `/api/applications/my` | Patient | Get all of a patient's applications |
| `GET` | `/api/applications/trial/:id` | Researcher | Get all applicants for a trial |

---

## 📸 App Flow & Screenshots

> *(Screenshots are illustrative of the intended UI flow. Replace with actual screenshots before submission.)*

### 1. 🏠 Landing Page
A welcoming hero section explaining TrialBridge's dual mission, with CTAs for patients and researchers.

```
[SCREENSHOT: Landing Page with Hero Banner]
```

---

### 2. 🔐 Authentication — Register & Login
Users choose their role (Patient or Researcher) at sign-up. JWT token stored in localStorage upon login.

```
[SCREENSHOT: Registration Page — Role Selection]
[SCREENSHOT: Login Page]
```

---

### 3. 🔍 Trial Search (Patient View)
The core patient-facing interface. Filter panel on the left, scrollable trial cards on the right. Each card shows condition, phase, location, and status badge.

```
[SCREENSHOT: Trial Search Page with FilterPanel and TrialCards]
```

---

### 4. 📋 Trial Detail Page
Clicking a trial opens a detailed view with eligibility criteria, the study description, and an "Apply" button that opens a confirmation modal.

```
[SCREENSHOT: Trial Detail Page]
[SCREENSHOT: Application Confirmation Modal]
```

---

### 5. 👤 Patient Dashboard
Patients see all trials they've applied to, with current application status (Pending / Accepted / Rejected).

```
[SCREENSHOT: Patient Dashboard — Application Tracker]
```

---

### 6. 🏥 Researcher — Post a Trial
Researchers fill in a structured form to list a new clinical trial: title, condition, phase, location, eligibility criteria, and description.

```
[SCREENSHOT: Post a Trial Form]
```

---

### 7. 📊 Researcher Dashboard
Researchers see all their listed trials and can click into each one to view a list of applicants with their details.

```
[SCREENSHOT: Researcher Dashboard — Trial Management]
[SCREENSHOT: Applicant List for a Trial]
```

---

## 🚧 Challenges Faced During Development

### 1. Role-Based Routing on the Frontend
**Challenge:** React Router doesn't natively support role-based protected routes. Sending a patient to a researcher-only page (and vice versa) was possible without extra logic.  
**Solution:** We built a `<ProtectedRoute>` wrapper component that reads the user's role from AuthContext and redirects unauthorized users before rendering the page.

---

### 2. JWT Expiry & Persistent Session Management
**Challenge:** JWT tokens expired after 24h, causing silent failures on API calls. Users would hit a 401 error mid-session with no clear indication.  
**Solution:** Added an Axios response interceptor that catches 401 responses, clears the stale token from localStorage, and redirects the user to the login page with a toast message.

---

### 3. Complex Trial Filtering with Multiple Parameters
**Challenge:** Supporting simultaneous filtering by condition, phase, location, and status required dynamic MongoDB queries that could vary in their structure.  
**Solution:** Built a query-builder utility in the backend controller that conditionally appends filter fields to the Mongoose query object only if they are present in the request, keeping the logic clean and scalable.

---

### 4. ClinicalTrials.gov API Data Normalization
**Challenge:** The external ClinicalTrials.gov API returns deeply nested, verbose JSON with inconsistent field naming. Mapping it to our Trial schema cleanly was non-trivial.  
**Solution:** Wrote a dedicated `normalizer.js` utility that maps and transforms only the fields we need, handling missing or null values with sensible defaults.

---

### 5. Responsive Design on Complex Filter Layouts
**Challenge:** The search page has a side filter panel + card grid layout that broke on smaller screens. The filter panel overlapped cards on tablet viewports.  
**Solution:** Used Tailwind CSS breakpoints to convert the side-by-side layout into a collapsible drawer/modal for filter options on `md` and smaller screens.

---

### 6. CORS Configuration Between Frontend & Backend
**Challenge:** During local development, the Vite dev server on port 5173 and Express on port 5000 caused cross-origin request blocks.  
**Solution:** Configured Express's `cors` package with specific allowed origins, and added a Vite proxy rule in `vite.config.js` to forward `/api` calls during development.

---

## 👥 Team Contributions

| Team Member | Roll No. | Contributions |
|---|---|---|
| **Siddhant Vishe** | — | Project Lead · Backend architecture · Auth module (JWT, bcrypt) · Trial CRUD APIs · MongoDB schema design |
| **Shreyas Sudarshana** | — | Frontend Lead · React component library · Trial Search & Filter UI · Patient Dashboard · Routing & state management |
| **Darshana Singh** | — | UI/UX Design · Landing Page · Responsive design (Tailwind CSS) · Researcher portal (Post Trial form + Dashboard) · Dark mode |
| **Jatin Sanap** | — | API Integration (ClinicalTrials.gov) · Application module (backend + frontend) · Email notification (Nodemailer) · Testing & deployment |

> *All four members collaborated on ideation, architecture decisions, code reviews, and the final report.*

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/trialbridge.git
cd trialbridge

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install
```

### Environment Setup

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Run the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

<div align="center">

Made with ❤️ by **Team TrialBridge**  
Semester 4 · Web Programming · 2025–26

</div>
