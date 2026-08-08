from fastapi import APIRouter, UploadFile, File
import os
import shutil
from PyPDF2 import PdfReader
from docx import Document

router = APIRouter()

UPLOAD_DIR = "uploads/job_descriptions"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def extract_jd_text(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        reader = PdfReader(file_path)
        text = ""

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        return text

    elif extension == ".docx":
        doc = Document(file_path)
        text = ""

        for para in doc.paragraphs:
            text += para.text + "\n"

        return text

    elif extension == ".txt":
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    return ""


@router.post("/upload-job-description")
async def upload_job_description(file: UploadFile = File(...)):

    # Save uploaded file
    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    jd_text = extract_jd_text(filepath)

    # Save latest Job Description
    with open("uploads/current_jd.txt", "w", encoding="utf-8") as f:
        f.write(jd_text)

    print("\n========== JOB DESCRIPTION ==========\n")
    print(jd_text)
    print("\n=====================================\n")

    return {
        "message": "Job Description uploaded successfully",
        "filename": file.filename,
        "job_description": jd_text
    }