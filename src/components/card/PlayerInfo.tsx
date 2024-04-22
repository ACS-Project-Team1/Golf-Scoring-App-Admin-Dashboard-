import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Heading,
  Flex,
  Text,
  Icon,
  CloseButton,
  useColorModeValue,
  StackDivider,
  HStack,
  Collapse,
} from '@chakra-ui/react';
import { BsFillPersonFill, BsTrophyFill } from 'react-icons/bs';

interface Golfer {
  id: number;
  name: string;
}

interface Team {
  id: number;
  teamName: string;
  golfers: string[];
}

// Dummy data structure for golfers
const dummyGolfers: Golfer[] = [
  { id: 1, name: 'Aarav' },
  { id: 2, name: 'Aditya' },
  { id: 3, name: 'Arjun' },
  { id: 4, name: 'Aryan' },
  { id: 5, name: 'Ishaan' },
  { id: 6, name: 'Kabir' },
  { id: 7, name: 'Rohan' },
  { id: 8, name: 'Vihaan' },
];

const TeamManagementForm = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeam, setNewTeam] = useState<Team>({ id: Math.random(), teamName: '', golfers: Array(2).fill('') });
  const [showMatchup, setShowMatchup] = useState(false);

  const handleGolferChange = (value: string, golferIndex: number): void => {
    const updatedGolfers = newTeam.golfers.map((golfer, index) =>
      index === golferIndex ? value : golfer
    );
    setNewTeam({ ...newTeam, golfers: updatedGolfers });
  };

  const addOrUpdateTeam = (): void => {
    if (newTeam.teamName.trim() === '' || newTeam.golfers.some(golfer => golfer.trim() === '')) {
      alert('Please fill all fields before submitting');
      return;
    }

    const existingTeamIndex = teams.findIndex(team => team.id === newTeam.id);
    if (existingTeamIndex >= 0) {
      const updatedTeams = teams.map((team, index) =>
        index === existingTeamIndex ? newTeam : team
      );
      setTeams(updatedTeams);
    } else {
      setTeams([...teams, { ...newTeam, id: Math.random() }]);
    }
    setNewTeam({ id: Math.random(), teamName: '', golfers: Array(2).fill('') }); // Reset the form for next entry
    setShowMatchup(true);
  };

  const removeTeam = (teamIndex: number): void => {
    setTeams(teams.filter((_, index) => index !== teamIndex));
  };

  const handleEditTeam = (team: Team): void => {
    setNewTeam(team);
  };

  const bgColor = useColorModeValue('purple.500', 'purple.200');
  const color = useColorModeValue('white', 'gray.800');

  return (
    <Box p={5}>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} mb={4}>
        {teams.map((team, index) => (
          <Flex key={team.id} align="center" bg={bgColor} color={color} p={4} borderRadius="md" w="full" justify="space-between">
            <HStack>
              <Icon as={BsFillPersonFill} />
              <Text fontWeight="bold">{team.teamName}</Text>
            </HStack>
            <Text flex="1" ml={4}>{team.golfers.join(', ')}</Text>
            <Button size="sm" colorScheme="yellow" onClick={() => handleEditTeam(team)}>Edit</Button>
            <CloseButton color="red.500" onClick={() => removeTeam(index)} />
          </Flex>
        ))}
      </VStack>
      <Box shadow="md" borderWidth="1px" borderRadius="lg" p={5}>
        <VStack spacing={3}>
          <Heading size="md">Add/Update Team Golfers</Heading>
          <FormControl>
            <FormLabel>Team Name</FormLabel>
            <Input
              placeholder="Enter team name"
              value={newTeam.teamName}
              onChange={(e) => setNewTeam({ ...newTeam, teamName: e.target.value })}
            />
          </FormControl>
          {newTeam.golfers.map((golfer, index) => (
            <FormControl key={index}>
              <FormLabel>{`Golfer ${index + 1}`}</FormLabel>
              <Select
                placeholder="Select Golfer"
                value={golfer}
                onChange={(e) => handleGolferChange(e.target.value, index)}
              >
                {dummyGolfers.map((golfer) => (
                  <option key={golfer.id} value={golfer.name}>
                    {golfer.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          ))}
          <Button colorScheme="blue" onClick={addOrUpdateTeam}>Submit</Button>
        </VStack>
      </Box>
      <Collapse in={showMatchup} animateOpacity>
        {teams.length >= 2 && (
          <Flex direction="column" align="center" mt={5}>
            <Box p={3} borderRadius="md" bg="teal.500" color="white">
              <Heading size="md">{`${teams[0].teamName} vs ${teams[1].teamName}`}</Heading>
            </Box>
            <Icon as={BsTrophyFill} boxSize={12} color="yellow.400" mt={3} />
          </Flex>
        )}
      </Collapse>
    </Box>
  );
};

export default TeamManagementForm;
