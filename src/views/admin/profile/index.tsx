// Overview.tsx
import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { DownloadCSVButton } from './DownloadCsv';
import { CSVUpload } from './UplaodCsv';

function Overview() {
  return (
    <Box p={5} position="relative" minHeight="100vh"> {/* Ensuring the box takes at least the height of the viewport */}
      <Box position="absolute" top="100px" width="full"> {/* Positioning the grid absolutely */}
        <SimpleGrid columns={2} spacing={10}>
          <DownloadCSVButton />
          <CSVUpload />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Overview;
