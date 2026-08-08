function TopCandidateCard({ candidate }) {
  if (!candidate) return null;

  const total =
    (candidate.score || 0) +
    (candidate.match_score || 0);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">

      <h2 className="text-3xl font-bold mb-6">
        🏆 Top Candidate
      </h2>

      <div className="space-y-3">

        <p className="text-xl">
          <strong>👤 Name:</strong> {candidate.name}
        </p>

        <p>
          <strong>⭐ ATS Score:</strong> {candidate.score}%
        </p>

        <p>
          <strong>🎯 JD Match:</strong> {candidate.match_score}%
        </p>

        <p>
          <strong>💯 Total Score:</strong> {total}
        </p>

        <p>
          <strong>Status:</strong> {candidate.status}
        </p>

      </div>

    </div>
  );
}

export default TopCandidateCard;