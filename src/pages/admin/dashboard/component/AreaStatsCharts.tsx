// const additionalNumbers = {
//     total: 7458,
//     english: 3155,
//     hausa: 4234,
//     igbo: 24,
//     yoruba: 45,
//   };

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useGetAreaStatsQuery } from "../../admin-api/statsApiSlice";
import { Box, LinearProgress, Typography } from "@mui/material";
import { AreaStats } from "../../../../types/areas.types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const AreaStatsCharts: React.FC = () => {
  const { data, isLoading } = useGetAreaStatsQuery();

  if (isLoading) {
    return <LinearProgress />;
  }

  const statistics: AreaStats[] = data?.data || [];

  const totalNumbersReal = statistics.reduce(
    (acc, stat) => acc + (stat.number_count || 0),
    0
  );

  const pieChartData = {
    labels: statistics.map((stat) => stat.area_name || "Unknown Area"),
    datasets: [
      {
        label: "Number Count Percentage",
        data: statistics.map((stat) =>
          totalNumbersReal > 0
            ? Number(
                (((stat.number_count || 0) / totalNumbersReal) * 100).toFixed(2)
              )
            : 0
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

  const hardcodedLanguageCounts = {
    hausa: 4598,
    english: 3395,
    igbo: 25,
    yoruba: 47,
  };

  // Total count for calculating percentages
  const totalLanguageCount = Object.values(hardcodedLanguageCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  // Calculate percentages for each language
  const normalizedPercentages = Object.entries(hardcodedLanguageCounts).map(
    ([key, count]) => ({
      label: key,
      percentage: totalLanguageCount
        ? ((count / totalLanguageCount) * 100).toFixed(2)
        : 0,
    })
  );

  const barChartData = {
    labels: normalizedPercentages.map((entry) => entry.label),
    datasets: [
      {
        label: "Percentage of Users by Language",
        data: normalizedPercentages.map((entry) => Number(entry.percentage)),
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Statistics:
      </Typography>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography variant="body2" sx={{ fontSize: "1rem" }}>
            Percentage Distribution (Numbers per Area)
          </Typography>
          <Pie data={pieChartData} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "43%" } }}>
          <Typography variant="body2" sx={{ fontSize: "1rem" }}>
            Language Distribution (Bar Chart)
          </Typography>
          <Bar data={barChartData} />
        </Box>
      </Box>
    </Box>
  );
};

export default AreaStatsCharts;
