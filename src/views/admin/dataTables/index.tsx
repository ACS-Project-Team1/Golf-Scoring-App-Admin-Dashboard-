

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  theme
} from '@chakra-ui/react';

import LeagueForm from "components/card/leagueform";
import LeaguesTable from "components/card/leaguetable";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <LeagueForm />
      <LeaguesTable />
     
    </Box>
  );
}
