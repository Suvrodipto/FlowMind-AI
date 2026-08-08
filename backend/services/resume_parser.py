from PyPDF2 import PdfReader
from docx import Document
import os
import re


def extract_text(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        text = extract_pdf(file_path)

    elif extension == ".docx":
        text = extract_docx(file_path)

    else:
        return {}

    skills_list = [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node",
        "SQL",
        "Git",
        "Machine Learning",
        "Deep Learning",
        "Pandas",
        "NumPy",
        "Streamlit",
        "FastAPI"
    ]

    found_skills = []

    for skill in skills_list:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    score = min(len(found_skills) * 6, 100)

    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    email = emails[0] if emails else ""

    phones = re.findall(
        r"\b\d{10}\b",
        text.replace(" ", "")
    )

    phone = phones[0] if phones else ""

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    name = lines[0] if lines else "Unknown"

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": found_skills,
        "score": score,
        "resume_text": text
    }


def extract_pdf(file_path):
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def extract_docx(file_path):
    doc = Document(file_path)

    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text