// DownloadCsv.tsx
import React from 'react';
import { MdDownload } from 'react-icons/md';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';


interface Team {
  teamId: number;
  teamName: string;
  dpUrl: string;
  playerOne?: number;
  playerTwo?: number;
}

interface League {
    leagueId: number;
    leagueName: string;
    dateCreated: string;  // Make sure this matches the API response
    leagueStartDate: string;
    leagueEndDate: string;
    location: string;
    status: string;
  }
  

async function downloadCSV() {
    try {
        const responses = await Promise.all([
          fetch('http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams'),
          fetch('http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/leagues/getAllLeagues')
        ]);
      
        const data = await Promise.all(responses.map(async (res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })) as [Team[], League[]];
      
        console.log(data); // Log the data to see if all fields are present
        const teamsData = data[0].map((team: Team) => ({
            'Section': 'Teams',
            'Team ID': team.teamId,
            'Team Name': team.teamName,
            'Display Picture URL': team.dpUrl,
            'Player One ID': team.playerOne ?? 'N/A',
            'Player Two ID': team.playerTwo ?? 'N/A'
          }));
      
          const leaguesData = data[1].map((league: League) => ({
            'Section': 'Leagues',
            'League ID': league.leagueId,
            'League Name': league.leagueName,
            'Date Created': league.dateCreated,  // Make sure this is correctly mapped
            'Start Date': league.leagueStartDate,
            'End Date': league.leagueEndDate,
            'Location': league.location,
            'Status': league.status
          }));
          
      
          const csv = Papa.unparse([...teamsData, ...leaguesData]);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'GolfLeagueData.csv');
      } catch (error) {
        console.error('Error downloading CSV:', error);
      }
  }

  
  
  export function DownloadCSVButton() {
    const brandColor = useColorModeValue('brand.500', 'white');
    const textColorSecondary = useColorModeValue('gray.400', 'gray.500');
    
    return (
      <Flex direction="column" align="center" justify="center" p="20px" borderWidth="2px" borderRadius="lg" borderColor={textColorSecondary}>
        <Icon as={MdDownload} w="40px" h="40px" color={brandColor} />
        <Text fontSize="lg" fontWeight="700" color={brandColor}>Download CSV</Text>
        <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>Download data in CSV format</Text>
        <Button mt={4} colorScheme="blue" leftIcon={<MdDownload />} onClick={downloadCSV}>Download</Button>
      </Flex>
    );
  }
