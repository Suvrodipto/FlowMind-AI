import os
import ast
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_resume(resume_text):
    prompt = f"""
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY a valid Python dictionary in this exact format:

{{
    "skills": ["Python", "SQL", "Machine Learning"],
    "score": 85,
    "summary": "Short professional summary.",
    "strengths": [
        "Strong Python knowledge",
        "Good projects"
    ],
    "weaknesses": [
        "No certifications",
        "Few internships"
    ],
    "suggestions": [
        "Add more projects",
        "Improve resume formatting"
    ]
}}

Resume:

{resume_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        result = response.text.strip()

        # Remove markdown code block if Gemini returns it
        result = result.replace("```python", "")
        result = result.replace("```", "").strip()

        data = ast.literal_eval(result)

        return data

    except Exception as e:
        print("Gemini Error:", e)

        # Return fallback response so frontend never crashes
        return {
            "skills": [],
            "score": 0,
            "summary": "Analysis failed.",
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
            "error": str(e)
        }