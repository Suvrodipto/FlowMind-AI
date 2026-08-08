from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os


from database import get_db
from models import Candidate



router = APIRouter(
    prefix="",
    tags=["Candidates"]
)





# ================= GET ALL CANDIDATES ================= #

@router.get("/candidates")
def get_all_candidates(
    db: Session = Depends(get_db)
):

    candidates = db.query(Candidate).all()

    result = []


    for candidate in candidates:

        result.append({

            "id": candidate.id,

            "name": candidate.name,

            "email": candidate.email,

            "phone": candidate.phone,

            "skills": candidate.skills,

            "ats_score": candidate.ats_score or 0,

            "match_score": candidate.match_score or 0,

            "status": candidate.status or "Applied",

            "strengths": candidate.strengths,

            "weaknesses": candidate.weaknesses,

            "suggestions": candidate.suggestions,

            "resume_path": candidate.resume_path

        })


    return result







# ================= UPDATE STATUS ================= #

@router.put("/candidates/{candidate_id}/status")
def update_candidate_status(

    candidate_id:int,

    status:str,

    db:Session = Depends(get_db)

):


    candidate = (

        db.query(Candidate)

        .filter(
            Candidate.id == candidate_id
        )

        .first()

    )


    if not candidate:

        raise HTTPException(

            status_code=404,

            detail="Candidate not found"

        )



    candidate.status=status


    db.commit()


    return {

        "message":"Status updated",

        "status":status

    }








# ================= DELETE CANDIDATE ================= #

@router.delete("/candidates/{candidate_id}")
def delete_candidate(

    candidate_id:int,

    db:Session=Depends(get_db)

):


    candidate=(

        db.query(Candidate)

        .filter(

            Candidate.id==candidate_id

        )

        .first()

    )



    if not candidate:

        raise HTTPException(

            status_code=404,

            detail="Candidate not found"

        )



    db.delete(candidate)

    db.commit()



    return {

        "message":"Candidate deleted"

    }










# ================= DOWNLOAD ORIGINAL RESUME ================= #

@router.get("/resume/{candidate_id}")
def download_resume(

    candidate_id:int,

    db:Session=Depends(get_db)

):


    candidate=(

        db.query(Candidate)

        .filter(

            Candidate.id==candidate_id

        )

        .first()

    )



    if not candidate:

        raise HTTPException(

            status_code=404,

            detail="Candidate not found"

        )





    if not candidate.resume_path:


        raise HTTPException(

            status_code=404,

            detail="Resume path missing"

        )







    file_path=candidate.resume_path






    # Convert relative path

    if not os.path.isabs(file_path):


        file_path=os.path.join(

            os.getcwd(),

            file_path

        )








    if not os.path.exists(file_path):


        raise HTTPException(

            status_code=404,

            detail=f"Resume file not found {file_path}"

        )







    return FileResponse(

        path=file_path,

        filename=os.path.basename(file_path),

        media_type="application/pdf"

    )