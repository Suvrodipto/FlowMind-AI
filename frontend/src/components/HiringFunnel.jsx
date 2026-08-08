function HiringFunnel({ candidates }) {
  const total = candidates.length;

  const pending = candidates.filter(
    (c) => c.status === "Pending"
  ).length;

  const shortlisted = candidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;

  const rejected = candidates.filter(
    (c) => c.status === "Rejected"
  ).length;

  const hiringRate =
    total === 0
      ? 0
      : ((shortlisted / total) * 100).toFixed(1);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        📈 Hiring Funnel
      </h2>

      <div className="space-y-6">

        <div>
          <div className="flex justify-between text-white mb-1">
            <span>Total Candidates</span>
            <span>{total}</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-cyan-500 h-3 rounded-full"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-white mb-1">
            <span>Pending</span>
            <span>{pending}</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full"
              style={{
                width:
                  total === 0
                    ? "0%"
                    : `${(pending / total) * 100}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-white mb-1">
            <span>Shortlisted</span>
            <span>{shortlisted}</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width:
                  total === 0
                    ? "0%"
                    : `${(shortlisted / total) * 100}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-white mb-1">
            <span>Rejected</span>
            <span>{rejected}</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full"
              style={{
                width:
                  total === 0
                    ? "0%"
                    : `${(rejected / total) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 mt-4">

          <h3 className="text-xl font-bold text-cyan-400">
            Hiring Rate
          </h3>

          <p className="text-4xl text-white mt-2">
            {hiringRate}%
          </p>

        </div>

      </div>

    </div>
  );
}

export default HiringFunnel;