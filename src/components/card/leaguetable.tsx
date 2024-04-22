import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface LeagueData {
  leagueId: number;
  leagueName: string;
  dateCreated: Date;
  leagueStartDate: Date;
  leagueEndDate: Date;
  location: string;
  status: string;
}

const LeaguesTable = () => {
  const [leagues, setLeagues] = useState<LeagueData[]>([]);
  const access_token = localStorage.getItem("firebaseIdToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Correct API endpoint
        const response = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/leagues/getAllLeagues", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token,
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const leagueData = await response.json();

        // Set the leagues data after mapping it to transform date strings to Date objects
        setLeagues(leagueData.map((league: any) => ({
          ...league,
          dateCreated: new Date(league.dateCreated),
          leagueStartDate: new Date(league.leagueStartDate),
          leagueEndDate: new Date(league.leagueEndDate),
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [access_token]);  // Dependency array includes access_token to re-fetch if token changes

  return (
    <Box p={4}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>League ID</Th>
              <Th>League Name</Th>
              <Th>Date Created</Th>
              <Th>League Start Date</Th>
              <Th>League End Date</Th>
              <Th>Location</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leagues.map((league) => (
              <Tr key={league.leagueId}>
                <Td>{league.leagueId}</Td>
                <Td>{league.leagueName}</Td>
                <Td>{league.dateCreated.toISOString().split('T')[0]}</Td>
                <Td>{league.leagueStartDate.toISOString().split('T')[0]}</Td>
                <Td>{league.leagueEndDate.toISOString().split('T')[0]}</Td>
                <Td>{league.location}</Td>
                <Td>{league.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaguesTable;
