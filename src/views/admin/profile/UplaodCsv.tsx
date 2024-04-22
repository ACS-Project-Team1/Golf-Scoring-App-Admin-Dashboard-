import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";
import * as XLSX from "xlsx";

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
  teamId?: number; // The original team ID
  [key: string]: any; // Allows any additional string keys to be part of the type
}

interface Team {
  teamId: number;
  teamName: string;
  dpUrl: string;
  ranking?: number;
  players: Player[]; // Include players property here
}

interface League {
  leagueId?: number; // Optional for creation
  leagueName: string;
  dateCreated?: string;
  leagueStartDate: string;
  leagueEndDate: string;
  location: string;
  status: string;
}

interface ProcessDataArgs {
  teams: Team[];
  leagues: League[];
  players: Player[];
}

function parseAndHandleData(
  file: File,
  onSuccess: (data: ProcessDataArgs) => void,
  onError: (error: string) => void
) {
  const fileReader = new FileReader();
  fileReader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const bufferArray = e.target!.result as ArrayBuffer;
      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const playersSheet = wb.Sheets["Players"];
      if (!playersSheet)
        throw new Error("Players sheet is missing or incorrectly named.");

      // Assert the mapped objects as Player type explicitly
      const players: Player[] = XLSX.utils
        .sheet_to_json<any>(playersSheet, {
          raw: false,
          header: 1,
        })
        .map(
          (row: any): Player => ({
            teamId: parseInt(row[0], 10), // Convert teamId to integer
            userId: row[1],
            username: row[2],
            email: row[3],
            firstName: row[4],
            lastName: row[5],
            profilePictureUrl: row[6],
            dateOfBirth: row[7],
            bio: row[8],
            gender: row[9],
            phoneNumber: row[10],
            role: row[11],
            registrationDate: row[12],
            lastLoginDate: row[13],
            totalRoundsPlayed: row[14],
            handicapIndex: row[15],
            accessLevel: row[16],
            status: row[17],
          })
        );

      console.log("Complete Players Data:", players);

      const teamsSheet = wb.Sheets["Teams"];
      if (!teamsSheet)
        throw new Error("Teams sheet is missing or incorrectly named.");
      const teams = XLSX.utils
        .sheet_to_json<any>(teamsSheet, {
          header: ["teamId", "teamName", "dpUrl"],
          range: 1,
        })
        .map((team: any) => ({
          teamId: parseInt(team.teamId, 10), // Ensure teamId is an integer
          teamName: team.teamName,
          dpUrl: team.dpUrl,
          players: [],
        }));

      console.log("Complete Teams Data:", teams);

      teams.forEach((team) => {
        team.players = players.filter(
          (player) => player.teamId === team.teamId
        );
        console.log(
          `Prepared team with ID ${team.teamId} and players:`,
          team.players
        );
      });

      console.log(
        "Teams data after assigning players:",
        JSON.stringify(teams, null, 2)
      );
      onSuccess({ teams, leagues: [], players });
    } catch (error) {
      console.error("Failed to parse file: ", error);
      onError("Failed to parse file: " + error.toString());
    }
  };
  fileReader.onerror = () => {
    console.error("Error reading file");
    onError("Error reading file");
  };
  fileReader.readAsArrayBuffer(file);
}

async function handleDataUpload(
  data: ProcessDataArgs,
  onSuccess: () => void,
  onError: (error: string) => void
) {
  try {
    // Handle team updates
    for (const team of data.teams) {
      console.log(
        `Sending update for team ${team.teamId} with players:`,
        team.players
      );
      const teamResponse = await fetch(
        `http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/updateTeam/${team.teamId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(team),
        }
      );

      // Check response to see if there's an error or message about the update
      const responseData = await teamResponse.json();
      if (!teamResponse.ok) {
        throw new Error(
          `Failed to update team ${team.teamId}: ${responseData.message}`
        );
      }
      console.log(`Response for team ${team.teamId}:`, responseData);
    }

    // Handle league creation
    for (const league of data.leagues) {
      if (!league.leagueId) {
        const response = await fetch(
          "http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/leagues/createLeague",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(league),
          }
        );
        if (!response.ok) throw new Error("Failed to create league");
      }
    }

    onSuccess();
  } catch (error) {
    onError(`API call failed: ${error}`);
  }
}

export function CSVUpload() {
  const toast = useToast();
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = useColorModeValue("gray.400", "gray.500");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      files.forEach((file) => {
        parseAndHandleData(
          file,
          (data) =>
            handleDataUpload(
              data,
              () => {
                toast({
                  title: "Data processed successfully",
                  description:
                    "All updates have been made to teams, leagues, and players.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              },
              (error) => {
                toast({
                  title: "An error occurred",
                  description: error,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
            ),
          (error) => {
            toast({
              title: "An error occurred",
              description: error,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        );
      });
    },
  });

  return (
    <Flex
      {...getRootProps()}
      direction="column"
      align="center"
      justify="center"
      p="20px"
      borderWidth="2px"
      borderRadius="lg"
      borderColor={textColorSecondary}
    >
      <input {...getInputProps()} />
      <Icon as={MdUpload} w="40px" h="40px" color={brandColor} />
      <Text fontSize="lg" fontWeight="700" color={brandColor}>
        Upload File
      </Text>
      <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
        Drag 'n' drop some files here, or click to select files
      </Text>
      <Button mt="4" colorScheme="blue">
        Upload
      </Button>
    </Flex>
  );
}
