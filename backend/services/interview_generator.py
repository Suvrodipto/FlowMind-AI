QUESTION_BANK = {
    "Python": [
        "Explain Python decorators.",
        "What is a Generator?",
        "Difference between List and Tuple?"
    ],

    "Java": [
        "Explain JVM.",
        "Difference between Interface and Abstract class.",
        "What is Multithreading?"
    ],

    "React": [
        "What are React Hooks?",
        "Explain useEffect.",
        "Difference between Props and State."
    ],

    "SQL": [
        "Difference between WHERE and HAVING.",
        "Explain SQL Joins.",
        "What are Indexes?"
    ],

    "FastAPI": [
        "Why FastAPI?",
        "Explain Dependency Injection.",
        "What are Pydantic Models?"
    ],

    "Machine Learning": [
        "Difference between Supervised and Unsupervised Learning.",
        "Explain Bias vs Variance.",
        "What is Cross Validation?"
    ]
}

HR_QUESTIONS = [
    "Tell me about yourself.",
    "Why should we hire you?",
    "Describe a difficult situation you solved.",
    "Why do you want to work here?",
    "Where do you see yourself in five years?"
]


def generate_questions(skills):
    technical = []

    for skill in skills:
        if skill in QUESTION_BANK:
            technical.extend(QUESTION_BANK[skill])

    if len(technical) == 0:
        technical = [
            "Explain one of your strongest technical projects."
        ]

    return {
        "technical": technical,
        "hr": HR_QUESTIONS
    }