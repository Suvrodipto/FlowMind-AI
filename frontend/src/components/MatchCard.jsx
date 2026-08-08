function MatchCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-slate-800 text-white p-8 rounded-2xl w-[900px] shadow-xl">

      <h2 className="text-3xl font-bold mb-6">
        🎯 Resume vs Job Description Match
      </h2>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h3 className="text-5xl font-bold text-green-400">
            {analysis.match_score}%
          </h3>

          <p className="text-gray-300 mt-2">
            Overall Match Score
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-10">

        <div>

          <h3 className="text-green-400 text-2xl font-bold mb-4">
            ✅ Matched Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {analysis.matched_skills?.length > 0 ? (
              analysis.matched_skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-600 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No matched skills.</p>
            )}

          </div>

        </div>

        <div>

          <h3 className="text-red-400 text-2xl font-bold mb-4">
            ❌ Missing Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {analysis.missing_skills?.length > 0 ? (
              analysis.missing_skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-600 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No missing skills.</p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MatchCard;