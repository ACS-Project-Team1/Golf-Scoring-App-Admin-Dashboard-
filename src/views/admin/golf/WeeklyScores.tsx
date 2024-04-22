// WeeklyScores.js
import { Bar } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const WeeklyScores = () => {
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example weeks
        datasets: [
            {
                label: 'Score',
                data: [70, 68, 69, 67], // Example scores
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Box p={5} shadow='md' borderWidth='1px'>
            <Text fontSize='xl' mb={4}>Weekly Scores</Text>
            <Bar data={data} options={options} />
        </Box>
    );
}

export default WeeklyScores;