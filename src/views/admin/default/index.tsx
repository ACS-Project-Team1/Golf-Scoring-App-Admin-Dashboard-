// Chakra imports
import { Box, SimpleGrid, useColorModeValue, Icon, Grid, Flex } from '@chakra-ui/react';

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
          name='Best Score This Round'
          value='69'
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
          value='72'
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
