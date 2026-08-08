from sqlalchemy import Column, Integer, String, Text
from database import Base



# ================= USER MODEL ================= #

class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    username = Column(
        String,
        unique=True,
        nullable=False
    )


    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )


    hashed_password = Column(
        String,
        nullable=False
    )





# ================= CANDIDATE MODEL ================= #

class Candidate(Base):

    __tablename__ = "candidates"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String,
        nullable=True
    )


    email = Column(
        String,
        nullable=True
    )


    phone = Column(
        String,
        nullable=True
    )


    skills = Column(
        Text,
        nullable=True
    )


    # Overall ATS score
    ats_score = Column(
        Integer,
        default=0
    )


    # JD matching score
    match_score = Column(
        Integer,
        default=0
    )


    # Connected job description
    job_id = Column(
        Integer,
        nullable=True
    )


    # Candidate pipeline status
    status = Column(
        String,
        default="Applied"
    )


    resume_text = Column(
        Text,
        nullable=True
    )


    summary = Column(
        Text,
        nullable=True
    )


    resume_path = Column(
        String,
        nullable=True
    )


    # AI Analysis

    strengths = Column(
        Text,
        nullable=True
    )


    weaknesses = Column(
        Text,
        nullable=True
    )


    suggestions = Column(
        Text,
        nullable=True
    )


    interview_questions = Column(
        Text,
        nullable=True
    )





# ================= JOB DESCRIPTION MODEL ================= #

class JobDescription(Base):

    __tablename__ = "job_descriptions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String,
        nullable=False
    )


    description = Column(
        Text,
        nullable=False
    )


    required_skills = Column(
        Text,
        nullable=True
    )