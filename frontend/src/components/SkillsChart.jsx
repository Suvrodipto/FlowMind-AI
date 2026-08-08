import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function SkillsChart({ candidates }) {
  const skillCount = {};

  candidates.forEach((candidate) => {
    if (!candidate.skills) return;

    let skills = [];

    // Handle both array and string
    if (Array.isArray(candidate.skills)) {
      skills = candidate.skills;
    } else if (typeof candidate.skills === "string") {
      skills = candidate.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
    }

    skills.forEach((skill) => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });

  // Sort skills by frequency
  const sortedSkills = Object.entries(skillCount).sort(
    (a, b) => b[1] - a[1]
  );

  const labels = sortedSkills.map((item) => item[0]);
  const values = sortedSkills.map((item) => item[1]);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Candidates",
        data: values,
        backgroundColor: "#06b6d4",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          stepSize: 1,
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl text-white font-bold mb-6">
        🔥 Top Skills
      </h2>

      {labels.length === 0 ? (
        <p className="text-slate-400">
          No skills found.
        </p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}

export default SkillsChart;