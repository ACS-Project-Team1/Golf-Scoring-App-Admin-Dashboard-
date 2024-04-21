import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import { MdOutlineGolfCourse, MdPeople, MdOutlineScore, MdCheckCircle } from 'react-icons/md';



const DashboardMetrics = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('green.700', 'green.500');
    let [numberOfTeams, setNumberOfTeams] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams");
            const data = await response.json();
            // Assuming data is an array of teams
            if (Array.isArray(data)) {
              setNumberOfTeams(data.length);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
// useEffect(() => {
//     fetch("https://dog.ceo/api/breeds/image/random")
//     .then(response => response.json())
//         // 4. Setting *dogImage* to the image url that we received from the response above
//     .then(data => setDogImage(data.message))
//   },[])

  const metrics = [
    { icon: MdOutlineGolfCourse, label: 'Total Teams', value: numberOfTeams },
    { icon: MdOutlineScore, label: 'Total Matches', value: 175 },
    { icon: MdCheckCircle, label: 'Matches Verified', value: 0 }, // Assuming you want to show verified instead of unverified
    { icon: MdPeople, label: 'Total Golfers', value: 12 },
  ];

  return (
    <Box bg={cardBg} borderRadius="lg" overflow="hidden">
      <Grid templateColumns="repeat(4, 1fr)" gap={6} p={5}>
        {metrics.map((metric, index) => (
          <GridItem w="100%" key={index}>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderColor={cardBorder}
              borderRadius="md"
              bg={cardBg}
              color="green.700"
              textAlign="center"
            >
              <metric.icon size={32} />
              <Text fontSize="2xl" fontWeight="bold" my={2}>{metric.value}</Text>
              <Text fontSize="md">{metric.label}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardMetrics;
