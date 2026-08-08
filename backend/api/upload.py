from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from crud import create_candidate

import os

from PyPDF2 import PdfReader
from docx import Document



router = APIRouter(
    prefix="",
    tags=["Resume Upload"]
)



UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)





# ================= ATS SCORE CALCULATOR ================= #

def calculate_ats_score(text):

    score = 0


    keywords = [

        "python",
        "java",
        "c++",
        "react",
        "javascript",
        "sql",
        "database",
        "machine learning",
        "fastapi",
        "api",
        "git",
        "github",
        "docker",
        "cloud"

    ]


    resume = text.lower()



    for keyword in keywords:

        if keyword in resume:

            score += 7



    if score > 100:

        score = 100



    return score





# ================= EXTRACT TEXT ================= #

def extract_text(file_path, filename):


    text = ""



    if filename.endswith(".txt"):


        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:

            text = f.read()



    elif filename.endswith(".pdf"):


        reader = PdfReader(
            file_path
        )


        for page in reader.pages:

            text += page.extract_text() or ""




    elif filename.endswith(".docx"):


        doc = Document(
            file_path
        )


        for para in doc.paragraphs:

            text += para.text + "\n"



    else:


        raise Exception(
            "Unsupported file format"
        )



    return text







# ================= UPLOAD RESUME ================= #

@router.post("/upload")
async def upload_resume(

    file: UploadFile = File(...),

    db: Session = Depends(get_db)

):


    try:


        file_path = os.path.join(

            UPLOAD_FOLDER,

            file.filename

        )



        content = await file.read()



        with open(
            file_path,
            "wb"
        ) as f:

            f.write(content)




        resume_text = extract_text(

            file_path,

            file.filename.lower()

        )



        ats_score = calculate_ats_score(

            resume_text

        )



        candidate_data = {


            "name": file.filename.split(".")[0],


            "email": "",


            "phone": "",


            "skills": resume_text[:500],


            "resume_text": resume_text,


            "resume_path": file_path,


            "summary": "AI Resume Analysis Generated",


            "ats_score": ats_score,


            "match_score": 0,


            "strengths": "Good technical background",


            "weaknesses": "Needs further evaluation",


            "suggestions": "Improve projects and skills",


            "job_id": None


        }





        candidate = create_candidate(

            db,

            candidate_data

        )




        return {


            "message":

            "Resume uploaded successfully",


            "candidate_id":

            candidate.id,


            "ats_score":

            ats_score

        }





    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )