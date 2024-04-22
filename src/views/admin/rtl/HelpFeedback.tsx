import React, { useState } from "react";
import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

export default function HelpFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const textColor = useColorModeValue("gray.700", "white");

  const handleSubmitFeedback = () => {
    // Here you can implement the logic to submit the feedback
    setIsLoading(true);
    // Simulating API call delay
    setTimeout(() => {
      setIsLoading(false);
      setFeedbackSubmitted(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFeedback("");
    setFeedbackSubmitted(false);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        onClick={() => setIsOpen(true)}
        borderWidth="2px"
        borderRadius="lg"
        borderColor={textColor}
        p="20px"
        mt="20px"
        color={textColor}
        fontWeight="700"
      >
        Feedback
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!feedbackSubmitted ? (
              <FormControl>
                <FormLabel>Feedback:</FormLabel>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please enter your feedback here..."
                />
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={isLoading}
                  onClick={handleSubmitFeedback}
                >
                  Submit
                </Button>
              </FormControl>
            ) : (
              <Text>
                Thank you for your feedback! We appreciate your input.
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
