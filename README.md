<div align="center">
<img src="https://img.shields.io/badge/TrialBridge-v1.0.0-4F46E5?style=for-the-badge&logo=react" alt="TrialBridge"/>

# TrialBridge
### *Bridging Groundbreaking Medical Research with the People Who Need It*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**Semester 4 Mini Project — Web Programming**
Pillai College of Engineering
</div>

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture & Design](#architecture--design)
- [APIs Used](#apis-used)
- [App Flow & Screenshots](#app-flow--screenshots)
- [Challenges Faced](#challenges-faced)
- [Team Contributions](#team-contributions)
- [Getting Started](#getting-started)

---

## Overview

**TrialBridge** is a modern, full-stack web platform designed to eliminate the friction between medical research and patient participation. Clinical trials are the backbone of medical progress — yet historically, connecting the right patients with the right trials has been fragmented, jargon-heavy, and painfully manual.

TrialBridge solves this with a clean, dual-sided platform:

| For Patients | For Researchers |
|---|---|
| Discover active clinical trials using a simple, filter-driven search interface | List and manage clinical studies to accelerate participant recruitment |
| Read plain-language summaries instead of dense medical PDFs | Connect directly with eligible, interested participants |
| Register interest or apply with a single click | Track applicant details and study status from a dashboard |
| No medical background required to navigate | Showcase credibility with structured, professional study profiles |

> *"TrialBridge is the digital bridge connecting groundbreaking medical research with the patients who can benefit from it."*

---

## Features

**Patient-Side**
- **Smart Trial Search** — Filter by condition, phase, location, and eligibility criteria
- **Plain-Language Summaries** — Medical jargon translated into readable descriptions
- **One-Click Registration** — Express interest or apply directly from the trial card
- **Patient Dashboard** — Track all applied and bookmarked trials in one place
- **Status Notifications** — Get updates on application and trial progress

**Researcher-Side**
- **Trial Listing Portal** — Create and publish clinical study profiles
- **Applicant Management** — View and manage a list of interested participants
- **Edit & Update Studies** — Keep trial status (recruiting, completed, closed) current
- **Secure Authentication** — Role-based access control for investigators

**Platform-Wide**
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **JWT Authentication** — Secure, token-based login for both user types
- **Dark / Light Mode** — Accessibility-focused theme toggle

---

## Architecture & Design

TrialBridge follows a **3-Tier MERN Stack Architecture**:

```
+----------------------------------------------------------+
|                      CLIENT LAYER                        |
|            React.js SPA (Vite + Tailwind CSS)            |
|    Patient UI   |   Researcher UI   |   Auth Pages        |
+---------------------------+------------------------------+
                            | REST API (JSON over HTTP)
                            v
+----------------------------------------------------------+
|                      SERVER LAYER                        |
|               Node.js + Express.js                       |
|    Auth Routes  |  Trial Routes  |  User Routes           |
|          JWT Middleware + Role Guard                      |
+---------------------------+------------------------------+
                            | Mongoose ODM
                            v
+----------------------------------------------------------+
|                    DATABASE LAYER                        |
|              MongoDB Atlas (Cloud)                       |
|    Users  |  Trials  |  Applications  |  Sessions         |
+----------------------------------------------------------+
```

**Design Patterns Used**

| Pattern | Implementation |
|---|---|
| MVC | Express routes → Controllers → Mongoose Models |
| RESTful API | Standard HTTP verbs (GET, POST, PUT, DELETE) |
| SPA | React Router for client-side navigation |
| Component-Based UI | Reusable React components across pages |
| Role-Based Access Control | Middleware separates Patient vs Researcher permissions |

---

## APIs Used

| API / Service | Purpose |
|---|---|
| **ClinicalTrials.gov API** | Seeds real-world clinical trial data for demonstration |
| **MongoDB Atlas** | Cloud-hosted NoSQL database with automatic scaling and backups |
| **JWT (jsonwebtoken)** | Stateless authentication tokens for secure, role-based access |
| **bcrypt.js** | Password hashing before storage |
| **Axios** | HTTP client used in the React frontend to call backend REST endpoints |
| **Cloudinary** | Researcher-uploaded study images and documents |
| **Nodemailer** | Email notifications to patients on application status change |

**Internal REST API Reference**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register as patient or researcher |
| `POST` | `/api/auth/login` | None | Login and receive JWT |
| `GET` | `/api/trials` | None | List all active trials with filter support |
| `GET` | `/api/trials/:id` | None | Get a single trial's full details |
| `POST` | `/api/trials` | Researcher | Create a new clinical trial listing |
| `PUT` | `/api/trials/:id` | Researcher (owner) | Update trial info or status |
| `DELETE` | `/api/trials/:id` | Researcher (owner) | Remove a trial listing |
| `POST` | `/api/applications` | Patient | Apply to a clinical trial |
| `GET` | `/api/applications/my` | Patient | Get all of a patient's applications |
| `GET` | `/api/applications/trial/:id` | Researcher | Get all applicants for a trial |

---

## App Flow & Screenshots

> Replace the placeholders below with actual screenshots before submission.

**1. Landing Page**
A welcoming hero section explaining TrialBridge's dual mission, with CTAs directing patients and researchers to their respective flows.
```
[SCREENSHOT: Landing Page with Hero Banner]
```

**2. Register & Login**
Users choose their role (Patient or Researcher) at sign-up. A JWT token is issued and stored upon successful login.
```
[SCREENSHOT: Registration Page — Role Selection]
[SCREENSHOT: Login Page]
```

**3. Trial Search — Patient View**
The core patient-facing interface. Filter panel on the left, scrollable trial cards on the right. Each card shows condition, phase, location, and a status badge.
```
[SCREENSHOT: Trial Search Page]
```

**4. Trial Detail Page**
Clicking a trial opens a detailed view with eligibility criteria, the study description, and an Apply button that opens a confirmation modal.
```
[SCREENSHOT: Trial Detail Page]
[SCREENSHOT: Application Confirmation Modal]
```

**5. Patient Dashboard**
Patients see all trials they have applied to, along with the current application status — Pending, Accepted, or Rejected.
```
[SCREENSHOT: Patient Dashboard]
```

**6. Post a Trial — Researcher**
Researchers fill in a structured form to list a new clinical trial: title, condition, phase, location, eligibility criteria, and description.
```
[SCREENSHOT: Post a Trial Form]
```

**7. Researcher Dashboard**
Researchers see all their listed trials and can click into each one to view a table of interested applicants.
```
[SCREENSHOT: Researcher Dashboard]
[SCREENSHOT: Applicant List for a Trial]
```

---

## Challenges Faced

**1. Role-Based Routing on the Frontend**
React Router does not natively prevent users from navigating to routes meant for the other role. We solved this by building a `ProtectedRoute` wrapper component that reads the authenticated user's role from AuthContext and redirects unauthorized visitors before the page renders.

**2. JWT Expiry and Silent Session Failures**
Tokens expired after 24 hours, causing API calls to silently return 401 errors with no user feedback. We added an Axios response interceptor that detects 401 responses, clears the stale token from localStorage, and redirects to the login page with a descriptive toast notification.

**3. Dynamic Multi-Parameter Trial Filtering**
Supporting simultaneous filtering by condition, phase, location, and status required MongoDB queries that changed shape depending on which filters were active. We built a query-builder utility in the backend controller that conditionally appends only the fields present in the request, keeping the logic clean and easily extendable.

**4. ClinicalTrials.gov API Data Normalization**
The external API returns deeply nested JSON with inconsistent field naming across different trial records. We wrote a dedicated `normalizer.js` module that extracts only the fields we need and applies sensible defaults for missing or null values before inserting into our schema.

**5. Responsive Layout for the Search and Filter UI**
The side filter panel combined with the card grid collapsed poorly on tablet viewports, causing the panel to overlap content. We used Tailwind CSS responsive breakpoints to convert the layout into a slide-out drawer on `md` screens and below, preserving usability across all device sizes.

**6. CORS Between Vite Dev Server and Express**
During development, requests from Vite on port 5173 to Express on port 5000 were blocked by the browser's CORS policy. We configured Express's `cors` middleware with explicit allowed origins and added a proxy rule in `vite.config.js` so all `/api` requests are forwarded transparently during development.

---

## Team Contributions

| Team Member | Roll No. | Contributions |
|---|---|---|
| **Siddhant Vishe** | — | Project Lead, backend architecture, Auth module (JWT + bcrypt), Trial CRUD APIs, MongoDB schema design |
| **Shreyas Sudarshana** | — | Frontend Lead, React component library, Trial Search and Filter UI, Patient Dashboard, routing and state management |
| **Darshana Singh** | — | UI/UX design, Landing Page, responsive design (Tailwind CSS), Researcher portal (Post Trial form and Dashboard), Dark mode |
| **Jatin Sanap** | — | API integration (ClinicalTrials.gov), Application module (backend and frontend), email notifications (Nodemailer), testing and deployment |

*All four members collaborated on ideation, architecture decisions, code reviews, and documentation.*

---

## Getting Started

**Prerequisites**
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

**Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/trialbridge.git
cd trialbridge

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**Environment Setup**

Create a `.env` file inside `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Run the App**
```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

<div align="center">
Made with care by <strong>Team TrialBridge</strong> &nbsp;|&nbsp; Semester 4 · Web Programming · 2025–26
</div>
