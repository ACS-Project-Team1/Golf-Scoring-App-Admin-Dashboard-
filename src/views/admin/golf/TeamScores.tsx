// TeamScores.js
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
// Import necessary parts from Chart.js
import {
    Chart, CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  } from 'chart.js';

  // Register the components
Chart.register(
    CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  );
  

const TeamScores = () => {
    // Sample data
    const teamScores = [
        { team: 'Team A', playerOne: 'Alice', playerTwo: 'Bob', score: 68 },
        { team: 'Team B', playerOne: 'Carol', playerTwo: 'Dave', score: 72 },
        // Add more teams as needed
    ];

    return (
        <Box p={5} shadow='md' borderWidth='1px'>
            <Text fontSize='xl' mb={4}>Team Scores</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Team</Th>
                        <Th>Player One</Th>
                        <Th>Player Two</Th>
                        <Th isNumeric>Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {teamScores.map((team, index) => (
                        <Tr key={index}>
                            <Td>{team.team}</Td>
                            <Td>{team.playerOne}</Td>
                            <Td>{team.playerTwo}</Td>
                            <Td isNumeric>{team.score}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default TeamScores;
