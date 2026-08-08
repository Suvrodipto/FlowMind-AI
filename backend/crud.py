from sqlalchemy.orm import Session

from models import Candidate, User



# ================= CREATE CANDIDATE ================= #

def create_candidate(
    db: Session,
    candidate_data: dict
):

    candidate = Candidate(

        name=candidate_data.get("name"),

        email=candidate_data.get("email"),

        phone=candidate_data.get("phone"),

        skills=candidate_data.get("skills"),


        # ATS Scores
        ats_score=candidate_data.get(
            "ats_score",
            candidate_data.get("score", 0)
        ),


        match_score=candidate_data.get(
            "match_score",
            0
        ),



        resume_text=candidate_data.get(
            "resume_text"
        ),


        summary=candidate_data.get(
            "summary"
        ),



        resume_path=candidate_data.get(
            "resume_path"
        ),



        strengths=candidate_data.get(
            "strengths"
        ),



        weaknesses=candidate_data.get(
            "weaknesses"
        ),



        suggestions=candidate_data.get(
            "suggestions"
        ),



        job_id=candidate_data.get(
            "job_id"
        )

    )


    db.add(candidate)

    db.commit()

    db.refresh(candidate)


    return candidate





# ================= GET ALL CANDIDATES ================= #

def get_candidates(
    db: Session
):

    return db.query(
        Candidate
    ).all()





# ================= GET SINGLE CANDIDATE ================= #

def get_candidate(
    db: Session,
    candidate_id: int
):

    return db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()





# ================= DELETE CANDIDATE ================= #

def delete_candidate(
    db: Session,
    candidate_id: int
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()


    if candidate:

        db.delete(candidate)

        db.commit()


    return candidate





# ================= CREATE USER ================= #

def create_user(
    db: Session,
    user_data: dict
):

    user = User(

        username=user_data.get(
            "username"
        ),

        email=user_data.get(
            "email"
        ),

        hashed_password=user_data.get(
            "hashed_password"
        )

    )


    db.add(user)

    db.commit()

    db.refresh(user)


    return user