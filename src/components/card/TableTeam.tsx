import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Input, FormControl, FormLabel,
  Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, VStack, Image, useDisclosure, useToast
} from '@chakra-ui/react';
import { EditIcon, SearchIcon } from '@chakra-ui/icons';

interface ScoreEntry {
  scoreEntryId: number;
  holeNumber: number;
  par: number;
  score: number;
}

interface ScoreCard {
  scoreCardId: number;
  courseRating: number;
  slopeRating: number;
  scoreEntries: ScoreEntry[];
}

interface Player {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  handicapIndex: number;
  scoreCards: ScoreCard[];
}

interface Team {
  teamId: number;
  teamName: string;
  dpUrl: string;
  ranking: number | null;
  players: Player[];
}

const TeamManagementTable = () => {
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams');
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Team[] = await response.json();
      setTeamData(data);
    } catch (error: any) {
      toast({
        title: "Error fetching teams",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);  // Include dependencies here

  const handleEdit = (team: Team) => {
    setEditTeam({ ...team });
    onOpen();
  };

  const handleSave = async () => {
    if (!editTeam) return;
    try {
      const response = await fetch(`http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/updateTeam/${editTeam.teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editTeam)
      });

      if (!response.ok) {
        throw new Error('Failed to update team');
      }

      toast({
        title: "Team updated successfully",
        description: "The team has been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      fetchData(); // Ensured fetchData is defined in scope
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (field: string, value: string | number | null) => {
    setEditTeam(prev => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (index: number, field: string, value: string | number) => {
    setEditTeam(prev => {
      const updatedPlayers = [...prev.players];
      updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
      return { ...prev, players: updatedPlayers };
    });
  };


  return (
    <Box overflowX="auto">
      <Stack direction="row" spacing={4} align="center" mb={4}>
        <Input placeholder="Search" width="auto" />
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
      </Stack>
      <Table variant="simple" size="sm" style={{ tableLayout: 'fixed' }}>
    <Thead>
        <Tr>
            <Th width="10%">Team ID</Th>
            <Th width="20%">Team Name</Th>
            <Th width="10%">Team Image</Th>
            <Th width="10%">Player 1</Th>
            <Th width="10%">Player 1 Handicap</Th>
            <Th width="10%">Player 1 Score Avg.</Th>
            <Th width="10%">Player 2</Th>
            <Th width="10%">Player 2 Handicap</Th>
            <Th width="10%">Player 2 Score Avg.</Th>
            <Th width="5%">Ranking</Th>
            <Th width="5%">Edit</Th>
        </Tr>
    </Thead>
    <Tbody>
        {teamData.map((team, index) => (
            <Tr key={index}>
                <Td>{team.teamId}</Td>
                <Td>{team.teamName}</Td>
                <Td><Image src={team.dpUrl} alt="Team Image" boxSize="50px" /></Td>
                {team.players.slice(0, 2).map((player, idx) => (
                    <React.Fragment key={`player-${idx}`}>
                        <Td>{player.username}</Td>
                        <Td>{player.handicapIndex}</Td>
                        <Td>{player.scoreCards.reduce((acc, card) => acc + card.scoreEntries.reduce((acc, entry) => acc + entry.score, 0), 0) / player.scoreCards.length || 'N/A'}</Td>
                    </React.Fragment>
                ))}
                {/* Ensure there are always two sets of player data columns */}
                {Array(3 * (2 - team.players.slice(0, 2).length)).fill(null).map((_, idx) => (
                    <Td key={idx}></Td> // Empty cells for missing players
                ))}
                <Td>{team.ranking}</Td>
                <Td textAlign="center">
                    <IconButton aria-label="Edit" icon={<EditIcon />} onClick={() => handleEdit(team)} />
                </Td>
            </Tr>
        ))}
    </Tbody>
</Table>

      {editTeam && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Team Name</FormLabel>
                  <Input type="text" value={editTeam.teamName} onChange={e => handleChange('teamName', e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Team Image URL</FormLabel>
                  <Input type="text" value={editTeam.dpUrl} onChange={e => handleChange('dpUrl', e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Ranking</FormLabel>
                  <Input type="number" value={editTeam.ranking || ''} onChange={e => handleChange('ranking', parseInt(e.target.value, 10) || null)} />
                </FormControl>
                {editTeam.players.slice(0, 2).map((player, idx) => (
                  <React.Fragment key={`player-edit-${idx}`}>
                    <FormControl>
                      <FormLabel>Player {idx + 1} Username</FormLabel>
                      <Input
                        type="text"
                        value={player.username}
                        onChange={e => handlePlayerChange(idx, 'username', e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Player {idx + 1} Handicap</FormLabel>
                      <Input
                        type="number"
                        value={player.handicapIndex}
                        onChange={e => handlePlayerChange(idx, 'handicapIndex', parseFloat(e.target.value))}
                      />
                    </FormControl>
                  </React.Fragment>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TeamManagementTable;
