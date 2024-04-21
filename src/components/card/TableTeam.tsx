
import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Select,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, DownloadIcon, SearchIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const TeamManagementTable = () => {
  // Sample data - replace this with actual data
  const teamData = [
    { leagueNumber: '01', TeamNumber: '01', player1: 'Ankit', player1teamscore: '30', player1handicapscore : '40', player2: 'Arjun',player2teamscore: '30', player2handicapscore : '40', typeOfGame: 'Tournament', winner: 'Arjun' },
    { leagueNumber: '02', TeamNumber: '05', player1: 'Ivan', player1teamscore: '60', player1handicapscore : '50', player2: 'Steve',player2teamscore: '60', player2handicapscore : '70', typeOfGame: 'Weekly', winner: 'Ivan' },

    // ... other teams
  ];

  return (
    <Box overflowX="auto">
      <Stack direction="row" spacing={4} align="center" mb={4}>
        <Select placeholder="Team Number" width="auto">
          <option value="all">All</option>
          {/* Populate with actual team numbers */}
        </Select>
        <Select placeholder="Filter" width="auto">
          <option value="all-time">All Time</option>
          {/* Other filtering options */}
        </Select>
        <Input placeholder="Search" width="auto" />
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
        <IconButton aria-label="Download" icon={<DownloadIcon />} />
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>League Number</Th>
            <Th>Team Name</Th>
            <Th>Player 1</Th>
            <Th>Player 1 Team Score</Th>
            <Th>Player 1 Handicap Score</Th>
            <Th>Player 2</Th>
            <Th>Player 2 Team Score</Th>
            <Th>Player 2 Handicap Score</Th>
            <Th>Type of Game</Th>
            <Th>Winner</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teamData.map((team, index) => (
            <Tr key={index}>
              <Td>{team.leagueNumber}</Td>
              <Td>{team.TeamNumber}</Td>
              <Td>{team.player1}</Td>
              <Td>{team.player1teamscore}</Td>
              <Td>{team.player1handicapscore}</Td>
              <Td>{team.player2}</Td>
              <Td>{team.player2teamscore}</Td>
              <Td>{team.player2handicapscore}</Td>
              <Td>{team.typeOfGame}</Td>
              <Td>{team.winner}</Td>
              <Td>
                <IconButton aria-label="Edit" icon={<EditIcon />} mr={2} />
                <IconButton aria-label="Delete" icon={<DeleteIcon />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Stack direction="row" spacing={4} align="center" justifyContent="space-between" mt={4}>
        <Button leftIcon={<ChevronLeftIcon />} size="sm" variant="outline">
          Prev
        </Button>
        {/* Pagination would go here */}
        <Button rightIcon={<ChevronRightIcon />} size="sm" variant="outline">
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default TeamManagementTable;
