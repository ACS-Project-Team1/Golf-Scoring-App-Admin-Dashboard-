import React from 'react';
import { MdDownload } from 'react-icons/md';
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import * as XLSX from 'xlsx';

interface Player {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    dateOfBirth?: string;
    bio?: string;
    gender?: string;
    phoneNumber?: string;
    role?: string;
    registrationDate: string;
    lastLoginDate?: string;
    rating?: number;
    ranking?: number;
    lastPlayedDate?: string;
    totalRoundsPlayed: number;
    achievements?: any;
    handicapIndex: number;
    accessLevel?: string;
    status?: string;
    teamId?: number;  // Added for reference to which team the player belongs
}

interface Team {
    teamId: number;
    teamName: string;
    dpUrl: string;
    players: Player[];
}

interface League {
    leagueId: number;
    leagueName: string;
    dateCreated: string;
    leagueStartDate: string;
    leagueEndDate: string;
    location: string;
    status: string;
}

async function downloadExcel() {
    try {
        const firebaseIdToken = localStorage.getItem("firebaseIdToken");
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${firebaseIdToken}`
            }),
            mode: 'cors'
        };

        const teamsResponse = await fetch('http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams', requestOptions);
        const leaguesResponse = await fetch('http://localhost:8080/api/leagues/getAllLeagues', requestOptions);

        if (!teamsResponse.ok || !leaguesResponse.ok) {
            throw new Error(`HTTP error! status: ${teamsResponse.status} or ${leaguesResponse.status}`);
        }

        const teamsData: Team[] = await teamsResponse.json();
        const leaguesData: League[] = await leaguesResponse.json();

        // Create a new workbook
        var wb = XLSX.utils.book_new();

        // Teams Sheet
        const teamsSheet = XLSX.utils.json_to_sheet(teamsData.map((team: Team) => ({
            'Team ID': team.teamId.toString(), // Convert teamId to string
            'Team Name': team.teamName,
            'Display Picture URL': team.dpUrl
        })));
        XLSX.utils.book_append_sheet(wb, teamsSheet, "Teams");

        // Players Sheet
        let playersData = teamsData.flatMap(team => team.players.map(player => ({
            'Team ID': team.teamId.toString(), // Convert teamId to string
            'User ID': player.userId,
            'Username': player.username,
            'Email': player.email,
            'First Name': player.firstName,
            'Last Name': player.lastName,
            'Profile Picture': player.profilePictureUrl,
            'Date of Birth': player.dateOfBirth,
            'Bio': player.bio,
            'Gender': player.gender,
            'Phone Number': player.phoneNumber,
            'Role': player.role,
            'Registration Date': player.registrationDate,
            'Last Login Date': player.lastLoginDate,
            'Total Rounds Played': player.totalRoundsPlayed,
            'Handicap Index': player.handicapIndex,
            'Access Level': player.accessLevel,
            'Status': player.status
        })));
        const playersSheet = XLSX.utils.json_to_sheet(playersData);
        XLSX.utils.book_append_sheet(wb, playersSheet, "Players");

        // Leagues Sheet
        const leaguesSheet = XLSX.utils.json_to_sheet(leaguesData.map((league: League) => ({
            'League ID': league.leagueId.toString(), // Convert leagueId to string
            'League Name': league.leagueName,
            'Date Created': league.dateCreated,
            'Start Date': league.leagueStartDate,
            'End Date': league.leagueEndDate,
            'Location': league.location,
            'Status': league.status
        })));
        XLSX.utils.book_append_sheet(wb, leaguesSheet, "Leagues");

        // Write the file
        XLSX.writeFile(wb, 'GolfLeagueData.xlsx');
    } catch (error) {
        console.error('Error downloading data:', error);
    }
}


export function DownloadCSVButton() {
    const brandColor = useColorModeValue('brand.500', 'white');
    const textColorSecondary = useColorModeValue('gray.400', 'gray.500');

    return (
        <Flex direction="column" align="center" justify="center" p="20px" borderWidth="2px" borderRadius="lg" borderColor={textColorSecondary}>
            <Icon as={MdDownload} w="40px" h="40px" color={brandColor} />
            <Text fontSize="lg" fontWeight="700" color={brandColor}>Download Excel</Text>
            <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>Download data in Excel format</Text>
            <Button mt={4} colorScheme="blue" leftIcon={<MdDownload />} onClick={downloadExcel}>Download</Button>
        </Flex>
    );
}
