from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import JobDescription


router = APIRouter(
    prefix="/job",
    tags=["Job Description"]
)



# CREATE JOB DESCRIPTION

@router.post("/create")
def create_job(
    title: str,
    description: str,
    required_skills: str,
    db: Session = Depends(get_db)
):

    new_job = JobDescription(

        title=title,

        description=description,

        required_skills=required_skills

    )


    db.add(new_job)

    db.commit()

    db.refresh(new_job)


    return {

        "message": "Job description created successfully",

        "job": new_job

    }




# GET ALL JOBS

@router.get("/list")
def get_jobs(

    db: Session = Depends(get_db)

):

    jobs = db.query(JobDescription).all()


    return jobs




# DELETE JOB

@router.delete("/{job_id}")
def delete_job(

    job_id: int,

    db: Session = Depends(get_db)

):

    job = (

        db.query(JobDescription)

        .filter(JobDescription.id == job_id)

        .first()

    )


    if not job:

        raise HTTPException(

            status_code=404,

            detail="Job not found"

        )


    db.delete(job)

    db.commit()


    return {

        "message": "Job deleted successfully"

    }