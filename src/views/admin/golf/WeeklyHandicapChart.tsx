// WeeklyHandicapChart.js
import { Line } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import {
    Chart, CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  } from 'chart.js';

  // Register the components
Chart.register(
    CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  );

const WeeklyHandicapChart = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Handicap",
        data: [10, 9, 8, 7],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl" mb={4}>
        Handicap Trend
      </Text>
      <Line data={data} />
    </Box>
  );
};

export default WeeklyHandicapChart;
