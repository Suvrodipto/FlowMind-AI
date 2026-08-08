function InterviewQuestions({ analysis }) {
  if (!analysis) return null;

  const questions = [];

  const skills = analysis.skills || [];

  if (skills.includes("Python")) {
    questions.push("Explain Python decorators with an example.");
    questions.push("What is the difference between a list and a tuple?");
  }

  if (skills.includes("Java")) {
    questions.push("Explain OOP principles in Java.");
  }

  if (skills.includes("SQL")) {
    questions.push("What is the difference between INNER JOIN and LEFT JOIN?");
  }

  if (skills.includes("React")) {
    questions.push("What are React Hooks?");
  }

  if (skills.includes("FastAPI")) {
    questions.push("Why is FastAPI faster than Flask?");
  }

  if (skills.includes("Machine Learning")) {
    questions.push("Explain the Machine Learning lifecycle.");
  }

  if (skills.includes("Git")) {
    questions.push("Explain the Git workflow and merge conflicts.");
  }

  if (questions.length === 0) {
    questions.push("Tell us about yourself.");
    questions.push("Explain your final year project.");
    questions.push("Why should we hire you?");
  }

  return (
    <div className="bg-slate-800 text-white p-8 rounded-2xl w-[900px] shadow-xl">

      <h2 className="text-3xl font-bold mb-6">
        🤖 AI Interview Questions
      </h2>

      <ol className="list-decimal ml-6 space-y-4">

        {questions.map((question, index) => (
          <li key={index}>
            {question}
          </li>
        ))}

      </ol>

    </div>
  );
}

export default InterviewQuestions;