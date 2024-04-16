// HandicapAdjustments.js
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import {
    Chart, CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  } from 'chart.js';

  // Register the components
Chart.register(
    CategoryScale, LinearScale, BarElement, LineElement,
    PointElement, Legend, Tooltip
  );

const HandicapAdjustments = () => {
    const adjustments = [
        { player: 'Alice', previous: 5, current: 4 },
        { player: 'Bob', previous: 8, current: 7 },
        // More players as needed
    ];

    return (
        <Box p={5} shadow='md' borderWidth='1px'>
            <Text fontSize='xl' mb={4}>Handicap Adjustments</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Player</Th>
                        <Th>Previous Handicap</Th>
                        <Th>Current Handicap</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {adjustments.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.player}</Td>
                            <Td>{item.previous}</Td>
                            <Td>{item.current}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default HandicapAdjustments;
