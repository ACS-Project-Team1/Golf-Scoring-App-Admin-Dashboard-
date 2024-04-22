import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import HelpFeedback from './HelpFeedback'; 
import HelpSec from './HelpSection';
function Help() {
  return (
    <Box p={5} position="relative" minHeight="100vh">
      <Box position="absolute" top="100px" width="full">
        <SimpleGrid columns={2} spacing={10}>
			<HelpSec/>
          <HelpFeedback /> 
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Help;
