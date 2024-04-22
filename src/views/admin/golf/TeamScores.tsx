import React, { useState, useEffect } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TeamScores = () => {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams");
                const teams = await response.json();
                setTeamData(teams);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeamData();
    }, []);

    return (
        <Box p={5} shadow='md' borderWidth='1px'>
            <Text fontSize='xl' mb={4}>Team Scores</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Team Name</Th>
                        <Th>Player 1 Name</Th>
                        <Th>Player 1 Handicap Score</Th>
                        <Th>Player 2 Name</Th>
                        <Th>Player 2 Handicap Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {teamData.map((team, index) => (
                        <Tr key={index}>
                            <Td>{team.teamName}</Td>
                            {team.players.map((player:any, idx:any) => (
                                <React.Fragment key={idx}>
                                    <Td>{player.firstName} {player.lastName}</Td>
                                    <Td>{player.handicapIndex}</Td>
                                </React.Fragment>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default TeamScores;
