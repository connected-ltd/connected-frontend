import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Item = { area_name?: string; number_count?: number };
type Props = { stats: Item[]; heightClass?: string };

const AreaPieChart: React.FC<Props> = ({
  stats,
  heightClass = "h-72 md:h-80",
}) => {
  const total = useMemo(
    () => stats.reduce((a, s) => a + (s.number_count || 0), 0),
    [stats]
  );

  const data = {
    labels: stats.map((s) => s.area_name || "Unknown Area"),
    datasets: [
      {
        label: "Number Count (%)",
        data: stats.map((s) =>
          total ? Number((((s.number_count || 0) / total) * 100).toFixed(2)) : 0
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 ${heightClass}`}
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default AreaPieChart;
