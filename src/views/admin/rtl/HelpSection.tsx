import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

function HelpSec() {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
        Need Help?
      </Text>
      <Text fontSize="md" color={textColor} textAlign="center">
        If you need assistance or have any questions, please feel free to contact us at support@example.com.
      </Text>
    </Flex>
  );
}

export default HelpSec;
