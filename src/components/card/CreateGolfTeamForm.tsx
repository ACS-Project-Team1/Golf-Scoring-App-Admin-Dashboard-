import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  VStack,
  Heading,
  useColorModeValue,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const CreateGolfTeamForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor: string = useColorModeValue('teal.500', 'teal.200');
  const color: string = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create New Team
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
              <VStack spacing={4} align="flex-start">
                <FormControl id="team-name">
                  <FormLabel>Team Name</FormLabel>
                  <Input type="text" placeholder="Enter team name" />
                </FormControl>
                <FormControl id="player1-name">
                  <FormLabel>Player 1 Name</FormLabel>
                  <Input type="text" placeholder="Enter player 1 name" />
                </FormControl>
                <FormControl id="player1-number">
                  <FormLabel>Player 1 Number</FormLabel>
                  <Input type="text" placeholder="Enter player 1 number" />
                </FormControl>
                <FormControl id="player2-name">
                  <FormLabel>Player 2 Name</FormLabel>
                  <Input type="text" placeholder="Enter player 2 name" />
                </FormControl>
                <FormControl id="player2-number">
                  <FormLabel>Player 2 Number</FormLabel>
                  <Input type="text" placeholder="Enter player 2 number" />
                </FormControl>
                <Checkbox>Hole by hole best</Checkbox>
                <Button
                  size="md"
                  bgColor={bgColor}
                  color={color}
                  onClick={() => {
                    console.log('Submit team information');
                    onClose(); // Close the modal after form submission
                  }}
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

export default CreateGolfTeamForm;
