# OutreachIQ – Email Outreach Automation Builder

![image](docs/screenshots/landing.png)

---

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![image](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![image](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![image](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![image](https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white)
![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


### Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Directory Structure & Architecture](#directory-structure--architecture)
- [Screenshots](#screenshots)
- [Local Development & Setup](#local-development--setup)
- [Future scope](#future-scope)
- [License](#license)
- [Feedback](#feedback)

---

### Description
OutreachIQ is a fullstack email automation flow creator platform that enables users to design, schedule, and track multi-step outreach campaigns.  
With a visual flow builder, lead targeting, and real-time analytics, OutreachIQ streamlines cold email outreach workflows for startups.  

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
- **pages** – Route-based views 
- **components** – Reusable UI 
- **contexts** – Global state management to prevent props drilling
- **utils(client)** – Helpers, constants, and utility functions 
- **data** - JSON files for static data and email templates
- **server/** – Node.js + Express backend web server with RESTful APIs 
- **config** – Central configurations for env variables and instances
- **services** – Core business logic and interaction with database models  
- **models** – Flexible mongoose schemas   
- **routes** – REST API endpoints 
- **utils(server)** – Logger, constants, error handling functions  


**Architecture at a glance:**  
- **Frontend (React):** Handles UI, state management, client side rendering (CSR) and routing.  
- **Backend (Node + Express):** REST APIs, authentication, job scheduling, DB persistence.  
- **Job Scheduler (Agenda):** Runs background tasks like sending emails at scheduled times, check job success and failures.  
- **NoSQL Database (MongoDB):** Stores users, flows, leads, and scheduled jobs metadata.
- **Caching (Redis):** Caching layer to improve response times and reduce redundant database queries. 

---

### Screenshots

##### Sign Up and Sign In pages for user registration and authentication
![](docs/screenshots/register.png)

![](docs/screenshots/login.png)


##### Forget password page to send reset link to user via email
![](docs/screenshots/reset%20password.png)

![](docs/screenshots/reset%20link.png)

![](docs/screenshots/new%20password.png)


##### Dashboard after login with Flow Creator Canvas, Left Sidebar and Right Sidebar
![](docs/screenshots/nav-profile.png)


##### Create new flow to build a new sequence of outreach emails 
![](docs/screenshots/create-flow.png)


##### Choose lead source
![](docs/screenshots/lead%20source.png)


##### Add leads from CSV file
![](docs/screenshots/csv%20lead.png)


##### Preview leads
![](docs/screenshots/preview-leads.png)


##### Create a new block
![](docs/screenshots/new-node.png)


##### Create email block with title, subject, body and variables.
![](docs/screenshots/email1.png)


##### Choosing pre-built email templates
![](docs/screenshots/email2.png)


##### Use placeholders in the template 
![](docs/screenshots/email3.png)


##### Create custom template with full control 
![](docs/screenshots/email4.png)


##### Create wait block with delay and format 
![](docs/screenshots/wait-node.png)


##### Example of a product demo invite (from template) email sent to a lead
![](docs/screenshots/email-example.png)


##### View created or scheduled flows 
![](docs/screenshots/savedlows.png)


##### View details of each flow 
![](docs/screenshots/saved1.png)

![](docs/screenshots/saved2.png)


##### View analytics for better insights to your flow performances 
![](docs/screenshots/analytics1.png)

![](docs/screenshots/analytics2.png)


#####  View profile details and subscription details
![](docs/screenshots/profile1.png)

![](docs/screenshots/profile2.png)


#####  View settings page 
![](docs/screenshots/settings.png)


##### Logout confirmation
![](docs/screenshots/logout.png)

##### Contact page
![](docs/screenshots/contact.png)

---

### Local Development & Setup

```bash
# Clone the repo
git clone https://github.com/Suman373/outreachiq.git

# Move to the project 
cd outreachiq

# Change directory to client and server using
cd client
cd server

# Install dependencies in both dir 
npm install

# Run the client locally
npm run dev

# Start the server locally
npm run dev

# Run redis with docker 
npm run redis-start

# To stop the container
npm run redis-stop

# To run tests
npm run test
```

---

### Future Scope
<!-- - 📌 **Deployment** – Hosting frontend (Vercel/Netlify) and backend (Render/Heroku)   -->
- **Two-factor authentication** - Additional layer of security
- **Logs Visualization** –  Live view of jobs being executed and the logs related to each successful delivery. 
- **Enhanced Analytics** – Graphs/charts for outreach campaign performance, lead conversion, CTR and other metrics
- **Retry Logic** – Automatic retries for failed jobs
- **Role-based Access Control** – Multi-user/team support for campaigns  


---

### License
![image](https://img.shields.io/badge/MIT-green?style=for-the-badge)


---

### Feedback

We’d love to hear your thoughts and suggestions to improve this project!
If you have any feedback, questions, or ideas for new features, feel free to reach out:

Email: reachsuman.roy@gmail.com

---


### 
