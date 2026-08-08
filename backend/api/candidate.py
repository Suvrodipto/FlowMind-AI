from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from crud import (
    get_candidates,
    update_candidate_status,
    delete_candidate,
)

router = APIRouter()


@router.get("/candidates")
def fetch_candidates(db: Session = Depends(get_db)):
    candidates = get_candidates(db)

    result = []

    for c in candidates:
        result.append({
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "phone": c.phone,
            "skills": c.skills.split(", ") if c.skills else [],
            "score": c.ats_score,
            "match_score": c.match_score,
            "status": c.status,
            "resume_text": c.resume_text,
            "summary": c.summary,
        })

    return result


@router.put("/candidate/{candidate_id}/{status}")
def change_candidate_status(
    candidate_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    candidate = update_candidate_status(db, candidate_id, status)

    if not candidate:
        return {"message": "Candidate not found"}

    return {"message": "Status updated successfully"}


@router.delete("/candidate/{candidate_id}")
def remove_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = delete_candidate(db, candidate_id)

    if not candidate:
        return {"message": "Candidate not found"}

    return {"message": "Candidate deleted successfully"}