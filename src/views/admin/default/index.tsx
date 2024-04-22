// Chakra imports
import { Box, SimpleGrid, useColorModeValue, Icon, Grid, Flex } from '@chakra-ui/react';
import {useState, useEffect} from "react";

// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdGolfCourse, MdScore } from 'react-icons/md';
import WeeklyScores from 'views/admin/golf/WeeklyScores';
import TeamScores from 'views/admin/golf/TeamScores';
import HandicapAdjustments from 'views/admin/golf/HandicapAdjustments';
import WeeklyHandicapChart from 'views/admin/golf/WeeklyHandicapChart';
import Banner from 'views/admin/marketplace/components/Banner';


export default function GolfLeagueDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('green.700', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [handicapIndex, setHandicapIndex] = useState(0);
  const [highestAverageScore, setHighestAverageScore] = useState(0);
  const access_token = localStorage.getItem("firebaseIdToken");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const userResponse = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/users/getAllUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token,
          }
        });
  
        const userData = await userResponse.json();
        console.log("User data:", userData);
  
        // Fetch teams data
        const teamResponse = await fetch("http://ec2-3-22-98-227.us-east-2.compute.amazonaws.com:8080/api/teams/getAllTeams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token,
          }
        });
  
        const teamsData = await teamResponse.json();
        console.log("Teams data:", teamsData);
        
      
  
        // Calculate highest average score
        let highestAverageScore = -Infinity;
  
        // Iterate over each team
        teamsData.forEach((team:any) => {
          // Iterate over each player in the team
          team.players.forEach((player:any) => {
            let totalScore = 0;
            let totalGames = 0;
  
            // Calculate total score and total games for this player
            player.scoreCards.forEach((scoreCard:any) => {
              totalScore += scoreCard.scoreEntries.reduce((acc:any, entry:any) => acc + entry.score, 0);
              totalGames += scoreCard.scoreEntries.length;
            });
  
            // Calculate average score for this player
            const averageScore = totalGames > 0 ? totalScore / totalGames : 0;
  
            // Update highestAverageScore if necessary
            highestAverageScore = Math.max(highestAverageScore, averageScore);
          });
        });
  
        console.log("Highest average score:", highestAverageScore);
  
        // Set the state with the calculated highest average score
        setHighestAverageScore(highestAverageScore);
  
        // Calculate best handicap index
        let bestHandicap = 0;
  
        // Iterate over each user in userData
        userData.forEach((user:any) => {
          // Check if the user's handicapIndex is greater than the current bestHandicap
          if (user.handicapIndex > bestHandicap) {
            // If yes, update the bestHandicap
            bestHandicap = user.handicapIndex;
          }
        });
  
        // Set the state with the calculated best handicap index
        setHandicapIndex(bestHandicap);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [access_token]);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      
      <Grid
        mb='20px'
        gap={{ base: '50px', xl: '50px' }}
        display={{ base: 'block', xl: 'grid' }}>
        <Flex flexDirection='column' >
          <Banner />
        </Flex>
      </Grid>

      <SimpleGrid columns={2} gap='20px' mb='20px'>

        {/* Two MiniStatistics components */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdScore} color={brandColor} />}
            />
          }
          name='Best Handicap Score'
          value= {handicapIndex}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdGolfCourse} color={brandColor} />}
            />
          }
          name='Average Score'
          value= {highestAverageScore}
        />
      </SimpleGrid>

      <SimpleGrid columns={2} gap='20px' mb='20px'>
        {/* TeamScores and WeeklyScores in the second row */}
        <TeamScores />
        <WeeklyScores />
      </SimpleGrid>

      <SimpleGrid columns={2} gap='20px' mb='20px'>
        {/* HandicapAdjustments and WeeklyHandicapChart in the third row */}
        <HandicapAdjustments />
        <WeeklyHandicapChart />
      </SimpleGrid>

      <SimpleGrid columns={1} gap='20px' mb='20px'>
        {/* Additional components like MiniCalendar */}
        <MiniCalendar h='100%' minW='100%' selectRange={false} />
      </SimpleGrid>
    </Box>
  );
}
