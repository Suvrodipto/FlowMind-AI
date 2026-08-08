import {
  Users,
  Trophy,
  Target,
} from "lucide-react";

function AnalyticsCards({ candidates }) {
  const totalCandidates = candidates.length;

  const averageATS =
    totalCandidates > 0
      ? Math.round(
          candidates.reduce(
            (sum, candidate) => sum + (candidate.score || 0),
            0
          ) / totalCandidates
        )
      : 0;

  const averageMatch =
    totalCandidates > 0
      ? Math.round(
          candidates.reduce(
            (sum, candidate) =>
              sum + (candidate.match_score || 0),
            0
          ) / totalCandidates
        )
      : 0;

  const cards = [
    {
      title: "Total Candidates",
      value: totalCandidates,
      icon: Users,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Average ATS Score",
      value: `${averageATS}%`,
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Average JD Match",
      value: `${averageMatch}%`,
      icon: Target,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 shadow-xl hover:scale-105 transition duration-300`}
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80 text-sm">
                  {card.title}
                </p>

                <h2 className="text-white text-4xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div className="bg-white/20 p-4 rounded-full">
                <Icon size={34} className="text-white" />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default AnalyticsCards;