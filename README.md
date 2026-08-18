# 🚀 FlowMind AI ATS
### AI-Powered Applicant Tracking System for Intelligent Recruitment

<p align="center">

<img src="https://img.shields.io/badge/AI-Recruitment-blueviolet"/>
<img src="https://img.shields.io/badge/FastAPI-Backend-green"/>
<img src="https://img.shields.io/badge/React-Frontend-blue"/>
<img src="https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-black"/>

</p>


## 🌟 Overview

**FlowMind AI ATS** is an AI-powered Applicant Tracking System designed to transform traditional recruitment workflows into an intelligent, automated, and data-driven hiring experience.

The platform uses AI-based resume analysis, ATS scoring, job description matching, and candidate ranking to help recruiters identify the best candidates faster and more accurately.

Instead of manually reviewing hundreds of resumes, FlowMind AI analyzes candidate profiles, evaluates compatibility, and generates actionable insights.

---



# 🚀 Live Demo

🌐 **Application URL**

https://flow-mind-ai-dun.vercel.app


## 🔑 Demo Login Credentials

Use the following credentials to explore the application:


**Email:**

demo@flowmind.ai


**Password:**

Demo@123






# 🎯 Problem Statement

Recruiters face several challenges:

- Hundreds of resumes received for a single job role
- Time-consuming manual screening
- Difficulty matching candidates with job requirements
- Human bias during candidate selection
- Lack of intelligent ranking systems


## 💡 Solution

FlowMind AI solves these problems by providing:

✅ Automated resume processing  
✅ AI-powered candidate evaluation  
✅ ATS compatibility scoring  
✅ Job description matching  
✅ Candidate ranking dashboard  
✅ Intelligent recruitment analytics  


---

# ✨ Key Features


## 🔐 Secure Authentication

- User registration
- JWT-based authentication
- Protected routes
- Secure API communication


## 📄 AI Resume Analysis

Upload:

- PDF resumes
- DOCX resumes


The system extracts candidate information and generates:

- ATS Score
- Skill evaluation
- Resume quality analysis
- Candidate ranking


---

## 💼 Job Description Intelligence

Recruiters can upload:

- Job Description PDFs
- DOCX files
- Text descriptions


The system analyzes:

- Required skills
- Candidate compatibility
- Matching percentage


---

## 🏆 AI Candidate Leaderboard

Candidates are automatically ranked based on:

- ATS Score
- Skill match
- Resume quality
- Job compatibility


Recruiters get:

🥇 Top candidates  
🥈 Ranked profiles  
🥉 AI recommendations  


---

## 📊 Recruitment Analytics Dashboard


The dashboard provides:

- Total candidates
- Average ATS score
- Average match score
- Shortlisted candidates
- AI insights
- Hiring analytics


---

# 🏗️ System Architecture


```
                 USER
                  |
                  |
            React Frontend
             (Vercel)
                  |
                  |
             REST APIs
                  |
                  |
            FastAPI Backend
             (Render)
                  |
        -------------------
        |                 |
     Database        AI Engine
     SQLite          Analysis
```


---

# 🛠️ Tech Stack


## Frontend

| Technology | Purpose |
|-|-|
| React.js | User Interface |
| Vite | Build Tool |
| Tailwind CSS | Modern Styling |
| Axios | API Communication |
| React Router | Navigation |
| Recharts | Analytics Visualization |


---

## Backend

| Technology | Purpose |
|-|-|
| FastAPI | Backend Framework |
| SQLAlchemy | Database ORM |
| Pydantic | Data Validation |
| JWT | Authentication |
| Python | Backend Logic |


---

## AI & Data Processing

| Technology | Purpose |
|-|-|
| AI Models | Resume Intelligence |
| NLP Processing | Resume Understanding |
| Matching Algorithms | Candidate Ranking |


---

## Deployment

| Platform | Usage |
|-|-|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| GitHub | Version Control |


---

# 📂 Project Structure


```
FlowMind-AI
│
├── frontend
│   │
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UploadResume.jsx
│   │   │   ├── AIAnalysis.jsx
│   │   │   └── JobRequirement.jsx
│   │   │
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
│
├── backend
│   │
│   ├── api
│   │   ├── auth_routes.py
│   │   ├── upload.py
│   │   ├── candidates.py
│   │   └── job_routes.py
│   │
│   ├── auth
│   │   ├── jwt_handler.py
│   │   └── password_handler.py
│   │
│   ├── models.py
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
└── README.md

```


---

# 🔄 Application Workflow


```
Register User
      |
      ↓
Login Authentication
      |
      ↓
JWT Token Generated
      |
      ↓
Dashboard Access
      |
      ↓
Upload Resume
      |
      ↓
AI Analysis
      |
      ↓
ATS Score Generation
      |
      ↓
Candidate Ranking
```


---

# 🚀 Running Locally


## Backend Setup


Clone repository:

```bash
git clone https://github.com/yourusername/FlowMind-AI.git
```


Navigate:

```bash
cd backend
```


Create environment:

```bash
python -m venv venv
```


Activate:

Windows:

```bash
venv\Scripts\activate
```


Install dependencies:

```bash
pip install -r requirements.txt
```


Run server:

```bash
uvicorn main:app --reload
```


Backend:

```
http://localhost:8000
```



---

## Frontend Setup


Navigate:

```bash
cd frontend
```


Install packages:

```bash
npm install
```


Run:

```bash
npm run dev
```


Frontend:

```
http://localhost:5173
```


---

# 🌍 Deployment


## Frontend

Vercel:

https://flow-mind-ai-dun.vercel.app


## Backend API

Render:

https://flowmind-backend-04v7.onrender.com


## API Documentation

Swagger:

https://flowmind-backend-04v7.onrender.com/docs



# 🔑 Demo Credentials


```
Email:
flowmindadmin@gmail.com


Password:
test
```


---

# 🔒 Security Features


✔ JWT Authentication  
✔ Protected API Routes  
✔ Password Hashing  
✔ CORS Configuration  
✔ Token Based Authorization  


---

# 🧠 Future Enhancements


## Version 2.0


🚀 Advanced AI Interview Assistant

🚀 Resume Improvement Suggestions

🚀 Automated Email Communication

🚀 Multi-user Recruiter Dashboard


🚀 Real-time Candidate Collaboration

🚀 AI Generated Interview Questions


---

# 🏆 Why FlowMind AI?


Traditional ATS:

❌ Keyword filtering  
❌ Manual screening  
❌ Slow recruitment  


FlowMind AI:

✅ AI-powered evaluation  
✅ Intelligent ranking  
✅ Faster hiring decisions  
✅ Data-driven recruitment  


---

# 👨‍💻 Developer


**Nirajan Dey**

B.Tech Computer Science & Engineering  
KIIT University


Passionate about:

- Artificial Intelligence
- Machine Learning
- Full Stack Development
- Building scalable software solutions


---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

## Built with ❤️ and AI


<img width="917" height="449" alt="image" src="https://github.com/user-attachments/assets/e4c184c9-e442-40fd-8615-4b792890e536" />











<img width="928" height="452" alt="image" src="https://github.com/user-attachments/assets/de250def-7ab0-47cb-a3f2-6ef4bbfcab12" />
