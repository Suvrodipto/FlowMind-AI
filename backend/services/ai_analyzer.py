from collections import Counter

COMMON_SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "React",
    "Node",
    "FastAPI",
    "Flask",
    "SQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Git",
    "HTML",
    "CSS",
    "Machine Learning",
    "AI",
    "TensorFlow",
    "Pandas",
    "NumPy"
]


def analyze_resume(resume_text, matched_skills, missing_skills):
    text = resume_text.lower()

    strengths = []

    for skill in COMMON_SKILLS:
        if skill.lower() in text:
            strengths.append(skill)

    strengths = list(dict.fromkeys(strengths))

    summary = (
        f"The candidate possesses {len(strengths)} technical skills "
        f"and has a Job Description match score of "
        f"{100 - len(missing_skills) * 5}%."
    )

    suggestions = []

    if "Docker" in missing_skills:
        suggestions.append("Learn Docker and containerization.")

    if "AWS" in missing_skills:
        suggestions.append("Gain AWS cloud experience.")

    if "Git" in missing_skills:
        suggestions.append("Mention Git/GitHub usage.")

    if "React" in missing_skills:
        suggestions.append("Add React projects.")

    if "FastAPI" in missing_skills:
        suggestions.append("Mention REST API development.")

    if len(suggestions) == 0:
        suggestions.append("Resume is well aligned with the Job Description.")

    return {
        "summary": summary,
        "strengths": strengths,
        "weaknesses": missing_skills,
        "suggestions": suggestions
    }