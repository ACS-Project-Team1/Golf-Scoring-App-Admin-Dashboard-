import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface LeagueData {
  leagueId: number;
  leagueName: string;
  dateCreated: Date;
  leagueStartDate: Date;
  leagueEndDate: Date;
  location: string;
  status: string;
}

const CreateLeagueForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('blue.500', 'blue.200');
  const color = useColorModeValue('white', 'gray.800');
  const [leagueData, setLeagueData] = useState<LeagueData>({
    leagueId: 0,
    leagueName: '',
    dateCreated: new Date(),
    leagueStartDate: new Date(),
    leagueEndDate: new Date(),
    location: '',
    status: 'UPCOMING'
  });

  const handleChange = (value: any, field: keyof LeagueData) => {
    setLeagueData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8080/api/leagues/createLeague', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        leagueId: leagueData.leagueId,
        leagueName: leagueData.leagueName,
        dateCreated: leagueData.dateCreated.toISOString(),
        leagueStartDate: leagueData.leagueStartDate.toISOString(),
        leagueEndDate: leagueData.leagueEndDate.toISOString(),
        location: leagueData.location,
        status: leagueData.status
      })
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const responseData = await response.json();
    console.log('Server Response:', responseData);
    onClose(); // Close the modal after form submission and successful data handling
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
        Create New League
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New League</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
              <VStack spacing={4} align="flex-start">
                <FormControl id="league-id">
                  <FormLabel>League ID</FormLabel>
                  <Input type="number" value={leagueData.leagueId} onChange={(e) => handleChange(parseInt(e.target.value), 'leagueId')} />
                </FormControl>
                <FormControl id="league-name">
                  <FormLabel>League Name</FormLabel>
                  <Input type="text" value={leagueData.leagueName} onChange={(e) => handleChange(e.target.value, 'leagueName')} />
                </FormControl>
                <FormControl id="date-created">
                  <FormLabel>Date Created</FormLabel>
                  <DatePicker
                    selected={leagueData.dateCreated}
                    onChange={(date: Date) => handleChange(date, 'dateCreated')}
                    dateFormat="yyyy-MM-dd"
                  />
                </FormControl>
                <FormControl id="league-start-date">
                  <FormLabel>League Start Date</FormLabel>
                  <DatePicker
                    selected={leagueData.leagueStartDate}
                    onChange={(date: Date) => handleChange(date, 'leagueStartDate')}
                    dateFormat="yyyy-MM-dd"
                  />
                </FormControl>
                <FormControl id="league-end-date">
                  <FormLabel>League End Date</FormLabel>
                  <DatePicker
                    selected={leagueData.leagueEndDate}
                    onChange={(date: Date) => handleChange(date, 'leagueEndDate')}
                    dateFormat="yyyy-MM-dd"
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel>Location</FormLabel>
                  <Input type="text" value={leagueData.location} onChange={(e) => handleChange(e.target.value, 'location')} />
                </FormControl>
                <FormControl id="status">
                  <FormLabel>Status</FormLabel>
                  <Input type="text" value={leagueData.status} onChange={(e) => handleChange(e.target.value, 'status')} />
                </FormControl>
                <Button
                  size="md"
                  bgColor={bgColor}
                  color={color}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLeagueForm;
