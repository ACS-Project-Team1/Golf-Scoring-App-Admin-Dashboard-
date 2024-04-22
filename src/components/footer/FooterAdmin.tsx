import React, { useState } from 'react';
import {
  Flex,
  Text,
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button
} from '@chakra-ui/react';

export default function Footer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const textColor = useColorModeValue('gray.400', 'white');

    return (
        <Flex
            zIndex="3"
            flexDirection={{
                base: 'column',
                xl: 'row'
            }}
            alignItems={{
                base: 'center',
                xl: 'start'
            }}
            justifyContent="space-between"
            px={{ base: '30px', md: '50px' }}
            pb="30px"
        >
            <Text
                color={textColor}
                textAlign={{
                    base: 'center',
                    xl: 'start'
                }}
                mb={{ base: '20px', xl: '0px' }}
            >
                &copy; {new Date().getFullYear()} Made with love by Golf Pro Team
            </Text>
            <Button onClick={onOpen} colorScheme="blue">Terms of Use</Button>

            {/* Modal for Terms of Use */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Terms of Use</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='500' color={textColor}>
                            <ol>
                                <li>
                                    <strong>System Access</strong>
                                    <ol type="a">
                                        <li>Authorization: Access to the admin page is restricted to authorized personnel only. Users must have proper credentials to access this area.</li>
                                        <li>Account Security: Administrators are responsible for maintaining the security of their account credentials. The organization will not be responsible for any unauthorized access that arises from the mishandling or sharing of credentials.</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Data Management</strong>
                                    <ol type="a">
                                        <li>Accuracy: Administrators must ensure that all data entered into the system, including player profiles, league information, and match results, is accurate and up-to-date.</li>
                                        <li>Confidentiality: Administrators are expected to uphold confidentiality and privacy standards by not disclosing sensitive player information without consent, except where legally required.</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>System Usage</strong>
                                    <ol type="a">
                                        <li>Fair Use: The system should be used in a manner that supports fair play and integrity of the league. Administrators should not manipulate data or system outputs to favor any player or team.</li>
                                        <li>Compliance: Administrators must comply with all applicable laws and regulations in the management of competitions and handling of personal data.</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Content Ownership and Intellectual Property</strong>
                                    <ol type="a">
                                        <li>Ownership: All content uploaded by administrators, including text, images, and videos, must be owned by the uploader or properly licensed.</li>
                                        <li>Intellectual Property: Unauthorized use of copyrighted material or breach of intellectual property rights is strictly prohibited.</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Modification of Terms</strong>
                                    <ol type="a">
                                        <li>Updates: These terms of use may be updated at any time without prior notice. Administrators will be notified of any significant changes, but it is their responsibility to review the terms periodically.</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Liability and Disclaimers</strong>
                                    <ol type="a">
                                        <li>System Availability: The organization makes no guarantees regarding the uninterrupted availability of the admin page or its functionality and is not responsible for losses or disruptions caused by system downtime.</li>
                                        <li>Limitation of Liability: The organization will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of or inability to use the admin services.</li>
                                    </ol>
                                </li>
                            </ol>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
