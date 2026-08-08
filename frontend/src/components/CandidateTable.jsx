import { useState } from "react";
import axios from "axios";
import ResumeModal from "./ResumeModal";

function CandidateTable({
  candidates,
  updateCandidateStatus,
  deleteCandidate,
}) {
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  if (candidates.length === 0) return null;

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-600";
      case "Rejected":
        return "bg-red-600";
      default:
        return "bg-yellow-500 text-black";
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const shortlistCandidate = async (candidate) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/candidate/${candidate.id}/Shortlisted`
      );

      updateCandidateStatus(candidate.id, "Shortlisted");
    } catch (err) {
      console.error(err);
      alert("Failed to shortlist candidate.");
    }
  };

  const rejectCandidate = async (candidate) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/candidate/${candidate.id}/Rejected`
      );

      updateCandidateStatus(candidate.id, "Rejected");
    } catch (err) {
      console.error(err);
      alert("Failed to reject candidate.");
    }
  };

  const removeCandidate = async (candidate) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/candidate/${candidate.id}`
      );

      deleteCandidate(candidate.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete candidate.");
    }
  };

  return (
    <>
      <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            🏆 AI Candidate Ranking
          </h2>

          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-700 px-4 py-2 rounded-lg w-80 outline-none"
          />

        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-700">

              <th className="p-3">Rank</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3">ATS</th>
              <th className="p-3">JD Match</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredCandidates.map((candidate, index) => {

              const rank = index + 1;
              const total =
                (candidate.score || 0) +
                (candidate.match_score || 0);

              return (
                <tr
                  key={candidate.id}
                  className="border-t border-slate-600 hover:bg-slate-700 transition"
                >

                  <td className="text-center font-bold text-xl">
                    {getRankBadge(rank)}
                  </td>

                  <td>{candidate.name}</td>

                  <td>{candidate.email}</td>

                  <td>{candidate.phone}</td>

                  <td className="text-center">
                    <span className="bg-blue-600 px-3 py-1 rounded-full">
                      {candidate.score}%
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="bg-purple-600 px-3 py-1 rounded-full">
                      {candidate.match_score}%
                    </span>
                  </td>

                  <td className="text-center font-bold text-cyan-400">
                    {total}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </span>

                  </td>

                  <td className="flex gap-2 flex-wrap justify-center py-3">

                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                    >
                      👀 View
                    </button>

                    <button
                      onClick={() => shortlistCandidate(candidate)}
                      className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded"
                    >
                      ✅
                    </button>

                    <button
                      onClick={() => rejectCandidate(candidate)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                    >
                      ❌
                    </button>

                    <button
                      onClick={() => removeCandidate(candidate)}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                    >
                      🗑
                    </button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {selectedCandidate && (
        <ResumeModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </>
  );
}

export default CandidateTable;