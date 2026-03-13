# JanMitra – Digital Village Services Portal

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

**JanMitra** is a full-stack digital governance portal designed to improve access to government services for rural citizens.
The platform allows users to apply for certificates, discover welfare schemes, track applications, report corruption, and securely access important documents.

The goal of this project is to demonstrate how **technology can improve accessibility, transparency, and efficiency in public service delivery**.

---

# Live Demo

Frontend

```
https://janmitra-portal.vercel.app
```

Backend API

```
https://janmitra-backend.onrender.com
```

---

# Features

## Certificate Application

Users can apply for government certificates online.

Supported certificates:

* Income Certificate
* Caste Certificate
* Birth Certificate
* Death Certificate
* Land Record Copy

Applications are stored in the database and can be tracked later.

---

## Application Tracking

Citizens can track application status using their **Aadhaar number**.

Possible statuses:

* Pending
* Processing
* Approved
* Rejected

---

## Government Scheme Recommendation

The portal recommends welfare schemes based on user information such as:

* Occupation
* Income
* Age
* Location

Schemes are fetched dynamically from MongoDB.

---

## Corruption & Issue Reporting

Citizens can report issues related to government services including:

* Bribe demands
* Application delays
* Fake beneficiaries
* Other service issues

Reports are stored and can be reviewed by authorities.

---

## DigiLocker-style Document Access

Users can access important government IDs such as:

* Aadhaar Card
* PAN Card
* Driving Licence

The portal provides a direct link to DigiLocker for secure document access.

---

## Personal Document Vault

Users can upload and manage personal documents such as:

* Land records
* Property papers
* Certificates

Uploaded documents display:

* File name
* Upload date

---

## Multilingual Interface

The platform supports multiple languages for accessibility:

* English
* Hindi
* Kannada

Language switching works across the entire portal.

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# Project Architecture

```
User
 │
 ▼
React Frontend (Vercel)
 │
 ▼
Express Backend API (Render)
 │
 ▼
MongoDB Atlas Database
```

---

# Database Collections

```
janmitra
 ├── applications
 ├── schemes
 └── reports
```

---

# Project Structure

```
src
 ├── context
 │    └── LanguageContext.jsx
 │
 ├── pages
 │    ├── Home.jsx
 │    ├── CertificateApplication.jsx
 │    ├── SchemeRecommender.jsx
 │    ├── TrackApplication.jsx
 │    ├── ReportCorruption.jsx
 │    └── MyDocuments.jsx
 │
 ├── translations.js
 └── App.jsx
```

Backend

```
janmitra-backend
 ├── models
 ├── routes
 ├── server.js
 └── .env
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/janmitra-portal.git
cd janmitra-portal
```

---

## Install Frontend Dependencies

```bash
cd janmitra-portal
npm install
```

Run frontend:

```bash
npm run dev
```

---

## Install Backend Dependencies

```bash
cd janmitra-backend
npm install
```

Run backend:

```bash
node server.js
```

---

# Environment Variables

Create a `.env` file in the backend folder.

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

# Future Improvements

Possible enhancements for the platform:

* Admin dashboard for government officers
* Real-time application status updates
* AI-based scheme recommendation
* Secure document storage using cloud storage
* SMS notifications for application updates
* Integration with government APIs

---
