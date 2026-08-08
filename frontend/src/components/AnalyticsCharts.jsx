import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AnalyticsCharts({ candidates }) {
  const shortlisted = candidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;

  const rejected = candidates.filter(
    (c) => c.status === "Rejected"
  ).length;

  const pending = candidates.filter(
    (c) => c.status === "Pending"
  ).length;

  const barData = {
    labels: ["Pending", "Shortlisted", "Rejected"],
    datasets: [
      {
        label: "Candidates",
        data: [pending, shortlisted, rejected],
        backgroundColor: [
          "#facc15",
          "#22c55e",
          "#ef4444",
        ],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Pending", "Shortlisted", "Rejected"],
    datasets: [
      {
        data: [pending, shortlisted, rejected],
        backgroundColor: [
          "#facc15",
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-white text-xl font-bold mb-5">
          📊 Candidate Status
        </h2>

        <Bar data={barData} options={options} />
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-white text-xl font-bold mb-5">
          🥧 Hiring Distribution
        </h2>

        <Pie data={pieData} />
      </div>

    </div>
  );
}

export default AnalyticsCharts;