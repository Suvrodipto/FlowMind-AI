from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import JobDescription

import os


# PDF and DOCX readers
from PyPDF2 import PdfReader
from docx import Document



router = APIRouter(
    prefix="/job",
    tags=["Job Upload"]
)



UPLOAD_FOLDER = "job_uploads"


os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)





# ================= UPLOAD JOB DESCRIPTION ================= #

@router.post("/upload")
async def upload_job_description(

    file: UploadFile = File(...),

    db: Session = Depends(get_db)

):

    try:


        file_path = os.path.join(

            UPLOAD_FOLDER,

            file.filename

        )



        # Save file

        with open(file_path, "wb") as f:

            content = await file.read()

            f.write(content)



        text = ""



        # ================= TXT ================= #

        if file.filename.endswith(".txt"):


            text = content.decode(
                "utf-8"
            )



        # ================= PDF ================= #

        elif file.filename.endswith(".pdf"):


            reader = PdfReader(
                file_path
            )


            for page in reader.pages:

                text += page.extract_text() or ""




        # ================= DOCX ================= #

        elif file.filename.endswith(".docx"):


            doc = Document(
                file_path
            )


            for para in doc.paragraphs:

                text += para.text + "\n"




        else:


            raise HTTPException(

                status_code=400,

                detail="Only TXT, PDF and DOCX files are allowed"

            )





        # Create database entry


        job = JobDescription(

            title=file.filename,

            description=text,

            required_skills=""

        )



        db.add(job)

        db.commit()

        db.refresh(job)



        return {


            "message":

            "Job description uploaded successfully",


            "job_id":

            job.id,


            "title":

            job.title

        }





    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )