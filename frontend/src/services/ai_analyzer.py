import re


def analyze_resume(resume_text):

    text = resume_text.lower()


    strengths = []
    weaknesses = []
    suggestions = []


    # Skills detection

    skills = [
        "python",
        "java",
        "c++",
        "react",
        "javascript",
        "sql",
        "fastapi",
        "machine learning",
        "django",
        "aws",
        "docker",
        "git"
    ]


    found_skills = []


    for skill in skills:
        if skill in text:
            found_skills.append(skill)


    if found_skills:
        strengths.append(
            "Strong technical skills in: "
            + ", ".join(found_skills)
        )
    else:
        weaknesses.append(
            "Technical skills are not clearly mentioned"
        )



    # Project analysis

    if "project" in text:
        strengths.append(
            "Has practical project experience"
        )
    else:
        weaknesses.append(
            "Projects section is missing or limited"
        )



    # Experience

    if "experience" in text or "intern" in text:
        strengths.append(
            "Has professional/internship experience"
        )
    else:
        weaknesses.append(
            "Limited professional experience"
        )



    # Certifications

    if "certification" in text or "certificate" in text:
        strengths.append(
            "Has certifications mentioned"
        )
    else:
        weaknesses.append(
            "No certifications mentioned"
        )



    # Suggestions

    suggestions.append(
        "Add more measurable achievements"
    )

    suggestions.append(
        "Include relevant projects and technologies"
    )

    suggestions.append(
        "Improve resume keywords for ATS matching"
    )


    return {

        "strengths": strengths,

        "weaknesses": weaknesses,

        "suggestions": suggestions

    }