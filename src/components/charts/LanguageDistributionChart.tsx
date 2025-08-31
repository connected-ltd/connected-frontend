import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Stat = { languages: string[]; number_count: number };
type Props = { stats: Stat[]; heightClass?: string };

const LanguageDistributionChart: React.FC<Props> = ({
  stats,
  heightClass = "h-72 md:h-80",
}) => {
  const percents = useMemo(() => {
    const counts: Record<string, number> = {};
    stats.forEach((s) =>
      (s.languages || []).forEach(
        (l) => (counts[l] = (counts[l] || 0) + (s.number_count || 0))
      )
    );
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts).map(([label, count]) => ({
      label,
      pct: total ? +((count / total) * 100).toFixed(2) : 0,
    }));
  }, [stats]);

  const data = {
    labels: percents.map((x) => x.label),
    datasets: [
      {
        label: "Users by Language (%)",
        data: percents.map((x) => x.pct),
        backgroundColor: "#36A2EB",
        borderRadius: 8,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v: number) => `${v}%` },
        grid: { borderDash: [6, 6] },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 ${heightClass}`}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default LanguageDistributionChart;
