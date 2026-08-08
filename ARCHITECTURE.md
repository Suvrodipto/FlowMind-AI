# 🏗️ FlowMind AI ATS - System Architecture

## 1. Overview

FlowMind AI ATS is an AI-powered Applicant Tracking System designed to automate and optimize the recruitment process.

The system combines a modern full-stack architecture with Artificial Intelligence to analyze resumes, understand job requirements, calculate candidate compatibility scores, and provide intelligent hiring recommendations.

The application follows a modular client-server architecture where the frontend communicates with backend services through REST APIs.

---

# 2. High-Level Architecture


```
                         USER
                          |
                          |
                          ↓

                 React Frontend
                 (Vercel Hosting)

                          |
                          |
                    HTTPS REST API

                          |
                          ↓

                 FastAPI Backend
                 (Render Hosting)

                          |
        ----------------------------------
        |                |               |
        ↓                ↓               ↓

 Authentication     AI Processing    Data Layer

 JWT Security       Resume Analysis  SQL Database
 User Management    JD Matching      SQLAlchemy ORM
                    Candidate Score


                          |
                          ↓

                  AI Intelligence Layer

          Resume Parser | Matching Engine |
          ATS Scoring   | Ranking System


                          |
                          ↓

                  Persistent Storage

              Candidate Data
              User Data
              Job Data
              Analysis Results

```

---

# 3. Technology Stack


## Frontend Layer

### React.js

Used for building a dynamic and responsive user interface.

Responsibilities:

- User authentication screens
- Dashboard visualization
- Resume upload interface
- Candidate leaderboard
- Analytics display


### Vite

Used as the frontend build tool.

Benefits:

- Fast development environment
- Optimized production builds
- Modern module handling


### Tailwind CSS

Used for:

- Responsive layouts
- Modern UI components
- Dashboard styling


### Axios

Used for:

- REST API communication
- Sending authentication tokens
- Uploading files


### React Router

Used for:

- Client-side navigation
- Protected routes
- Dashboard routing


### Recharts

Used for:

- Analytics visualization
- Hiring funnel charts
- Candidate statistics


---

# 4. Backend Architecture


The backend follows a modular FastAPI architecture.


```
Backend

│
├── API Layer
│
├── Authentication Layer
│
├── Business Logic Layer
│
├── AI Processing Layer
│
└── Database Layer

```


---

# 5. Backend Components


## API Layer

Location:

```
backend/api/
```


Responsible for handling HTTP requests.


Modules:


### auth_routes.py

Handles:

- User registration
- User login
- JWT token generation


### upload.py

Handles:

- Resume uploads
- File processing requests


### job_routes.py

Handles:

- Job creation
- Job requirement management


### candidates.py

Handles:

- Candidate retrieval
- Candidate ranking data


---

# 6. Authentication Architecture


Flow:


```
User Login

     |
     ↓

Email + Password

     |
     ↓

Password Verification

     |
     ↓

JWT Token Generation

     |
     ↓

Token Stored in Frontend

     |
     ↓

Authenticated API Requests

```


Security Implementation:

- Password hashing
- JWT based authentication
- Protected API endpoints
- Token validation


---

# 7. AI Processing Architecture


FlowMind AI uses AI-driven recruitment intelligence.


```
Resume Upload

      |
      ↓

Document Parser

      |
      ↓

Information Extraction

      |
      ↓

AI Analysis Engine

      |
      ↓

ATS Score Generation

      |
      ↓

Job Compatibility Matching

      |
      ↓

Candidate Ranking

```


---

# 8. AI Components


## Resume Analyzer

Responsibilities:

- Extract candidate information
- Identify technical skills
- Analyze experience
- Generate resume insights


---

## Job Description Analyzer


Responsibilities:

- Extract required skills
- Identify role expectations
- Understand hiring requirements


---

## Matching Engine


Responsibilities:

- Compare resume with job description
- Calculate compatibility score
- Identify skill gaps


---

## Candidate Ranking System


Uses:

- ATS score
- Match score
- Resume quality
- Skill relevance


Output:

Ranked candidate leaderboard.


---

# 9. Database Architecture


FlowMind AI uses SQLAlchemy ORM with SQLite database.


Database stores:


## Users Table


Stores:

| Field | Description |
|-|-|
| id | Unique user identifier |
| username | User name |
| email | Login email |
| hashed_password | Encrypted password |


---

## Candidates Table


Stores:

| Field | Description |
|-|-|
| id | Candidate ID |
| name | Candidate name |
| email | Candidate email |
| resume data | Extracted information |
| ATS score | AI evaluation score |
| Match score | Job compatibility score |
| Status | Hiring stage |


---

## Jobs Table


Stores:

| Field | Description |
|-|-|
| id | Job identifier |
| title | Job role |
| description | Job requirements |
| skills | Required skills |


---

# 10. Data Flow


## Resume Processing Flow


```
Recruiter

   |
   ↓

Upload Resume

   |
   ↓

Frontend

   |
   ↓

FastAPI Upload API

   |
   ↓

Resume Parser

   |
   ↓

AI Analyzer

   |
   ↓

Database Storage

   |
   ↓

Dashboard Visualization

```


---

# 11. Communication Between Components


## Frontend → Backend

Communication:

```
HTTPS REST API
```

Examples:

```
POST /login

POST /register

POST /upload

GET /candidates

GET /jobs
```


---

## Backend → Database

Communication:

```
SQLAlchemy ORM
```

Benefits:

- Database abstraction
- Secure queries
- Maintainable models


---

## Backend → AI Services

Communication:

```
AI Processing Pipeline
```

Used for:

- Resume understanding
- Skill extraction
- Candidate scoring


---

# 12. Deployment Architecture


```

                 Internet Users

                       |
                       |

              Vercel Frontend

                       |

              HTTPS Requests

                       |

              Render Backend

                       |

              Database + AI Engine


```


Deployment:

| Component | Platform |
|-|-|
| Frontend | Vercel |
| Backend | Render |
| Source Code | GitHub |
| Database | SQLite |


---

# 13. Scalability Design


Future improvements:


## Database Scaling

Current:

```
SQLite
```

Future:

```
PostgreSQL / Cloud Database
```


---

## AI Scaling

Future:

- Dedicated AI services
- Vector database integration
- Advanced NLP models


---

## Infrastructure Scaling

Future:

- Docker containers
- Kubernetes deployment
- Cloud load balancing


---

# 14. Design Principles


FlowMind AI follows:


### Modular Architecture

Each component has independent responsibility.


### Security First

Authentication and protected APIs ensure secure access.


### AI Driven Decisions

Recruitment decisions are enhanced through intelligent scoring.


### Scalable Development

Architecture allows future expansion.


---

# 15. Complete System Summary


FlowMind AI transforms recruitment by connecting:

```
Modern Frontend

        +

FastAPI Backend

        +

AI Intelligence

        +

Secure Authentication

        +

Data Analytics

```


into a complete intelligent hiring ecosystem.

---

## Built for Hackathon Innovation 🚀

**FlowMind AI ATS**

AI-powered recruitment. Faster decisions. Smarter hiring.
