# OutreachIQ – Cold Email Automation & Flow Builder

### Introduction
OutreachIQ is a **fullstack cold email automation platform** that enables users to design, schedule, and track multi-step outreach campaigns.  
With a visual flow builder, lead targeting, and real-time analytics, OutreachIQ streamlines cold email workflows for individuals and teams.  

---

### Tech Stack
- **React + TailwindCSS** → Fast, modern UI development with utility-first styling  
- **Node.js + Express** → Scalable backend for APIs
- **MongoDB** → Flexible document store for leads, flows, users, etc.
- **Agenda** → Powerful job scheduler with MongoDB persistence for async tasks  
- **React Router** → SPA routing with protected routes and nested flows  
- **LocalStorage + Context API** → Lightweight session persistence & global state management  
- **Redis** → In-memory caching layer for low latency responses
- **Docker** → Containerize Redis for consistent dev and prod environments
---

### Features
- **Authentication & Authorization** – Registration and secure login with json web tokens (JWT), cookies and middleware. Forget password management with email reset link 
- **Email Scheduling** – Async job scheduling using Agenda + MongoDB for reliable email delivery 
- **Analytics Dashboard** – Tracks quick stats such as total jobs, completed, failed, etc. Graphs to show trends such as flow creation and email delivery.
- **Flow Builder** – Create and connect nodes into automated outreach sequence.
- **Lead Management** – Import and parse leads from CSV to create campaigns, with preview functionality for a better user experience.  
- **Settings Page** – Updating configurations, and account preferences  
- **Logging & Error Handling** – Custom logger for structured jsonl logs increasing observability

---

### Directory Structure & Architecture

**Directory details**
- **client/** – React frontend with Tailwind CSS
- **pages** – Route-based views (Auth, Home, Flow Builder, SavedFlows, Settings)  
- **components** – Reusable UI (tables, forms, preloader, etc.)  
- **contexts** – Global state management (AuthContext, FlowContext)  
- **utils** – Helpers, constants, and logging utilities  

- **server/** – Node.js + Express backend web server with RESET APIs 
- **config** – Central configs (MongoDB, Agenda instance, environment vars)  
- **services** – Business logic (Flow service, Schedule service, Email service)  
- **models** – Mongoose schemas (User, Flow, Leads, etc.)  
- **routes** – REST API endpoints for flows, users, and settings  
- **utils** – Logger, constants, error handling  


**Architecture at a glance:**  
- **Frontend (React):** Handles UI, state management, client side rendering (CSR) and routing.  
- **Backend (Node/Express):** REST APIs, authentication, job scheduling, DB persistence.  
- **Job Scheduler (Agenda):** Runs background tasks like sending emails at scheduled times, check job success and failures.  
- **NoSQL Database (MongoDB):** Stores users, flows, leads, and scheduled jobs metadata.
- **Caching (Redis):** Caching layer to improve response times and reduce redundant database queries. 

---

## Ongoing Features
<!-- - 📌 **Deployment** – Hosting frontend (Vercel/Netlify) and backend (Render/Heroku)   -->
- **Two-factor authentication** - Additional layer of security
- **Logs Visualization** –  Live view of jobs being executed and the logs related to each successful delivery. 
- **Enhanced Analytics** – Graphs/charts for outreach campaign performance, lead conversion, CTR and other metrics
- **Retry Logic** – Automatic retries for failed jobs
- **Role-based Access Control** – Multi-user/team support for campaigns  

---

## 📸 Screenshots
(Add UI screenshots here)

---
