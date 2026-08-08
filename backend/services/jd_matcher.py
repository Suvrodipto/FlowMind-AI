import re


def extract_skills(text):
    skills_db = [
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
        "FastAPI",
        "Streamlit",
        "Machine Learning",
        "Deep Learning",
        "Pandas",
        "NumPy",
        "Docker",
        "AWS",
        "MongoDB",
        "Flask",
        "Django"
    ]

    found = []

    for skill in skills_db:
        if re.search(r"\b" + re.escape(skill) + r"\b", text, re.IGNORECASE):
            found.append(skill)

    return list(set(found))


def match_resume_with_jd(resume_text, jd_text):

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched = []
    missing = []

    for skill in jd_skills:

        if skill in resume_skills:
            matched.append(skill)

        else:
            missing.append(skill)

    if len(jd_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(jd_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "resume_skills": resume_skills,
        "jd_skills": jd_skills
    }