import React from "react";
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

type Props = {
  labels: string[];
  inData: number[];
  outData: number[];
  heightClass?: string;
};

const InOutBarChart: React.FC<Props> = ({
  labels,
  inData,
  outData,
  heightClass = "h-72 md:h-80",
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "In",
        data: inData,
        backgroundColor: "#0B5E9A", // deep blue
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
      {
        label: "Out",
        data: outData,
        backgroundColor: "#8CAFD3", // light desaturated blue
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: { usePointStyle: true, pointStyle: "circle" },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [6, 6], // dotted grid
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (ctx: any) =>
            ctx.tick.value === 0 ? "transparent" : "rgba(148,163,184,0.3)",
        },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div
      className={`rounded-xl border border-border-primary bg-bg-primary p-4 ${heightClass}`}
    >
      <div className="w-full h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default InOutBarChart;
