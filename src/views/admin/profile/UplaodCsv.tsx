// UploadCsv.tsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Papa, { ParseResult } from 'papaparse';
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';

interface CSVRow {
  Section: string;
  [key: string]: string | number | undefined;
}

function handleParsedData(data: CSVRow[]) {
  const teams = data.filter(row => row.Section === 'Teams');
  const leagues = data.filter(row => row.Section === 'Leagues');

  fetch('/api/teams/updateTeams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teams })
  });

  fetch('/api/leagues/updateLeagues', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leagues })
  });
}


export function CSVUpload() {
    const brandColor = useColorModeValue('brand.500', 'white');
    const textColorSecondary = useColorModeValue('gray.400', 'gray.500');
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (files: File[]) => {
        files.forEach((file: File) => {
          Papa.parse<CSVRow>(file, {
            complete: (result: ParseResult<CSVRow>) => handleParsedData(result.data),
            header: true
          });
        });
      }
    });
  
    return (
      <Flex {...getRootProps()} direction="column" align="center" justify="center" p="20px" borderWidth="2px" borderRadius="lg" borderColor={textColorSecondary}>
        <input {...getInputProps()} />
        <Icon as={MdUpload} w="40px" h="40px" color={brandColor} />
        <Text fontSize="lg" fontWeight="700" color={brandColor}>Upload CSV</Text>
        <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>Upload your CSV file here</Text>
        <Button mt={4} colorScheme="blue">Upload</Button>
      </Flex>
    );
  }