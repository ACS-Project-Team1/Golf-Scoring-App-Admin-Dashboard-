

import React from 'react';

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/marketplace/components/Banner';
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import NFT from 'components/card/NFT';
import Card from 'components/card/Card';

// Assets
import Golf1 from 'assets/img/nfts/Golf1.png';
import Golf2 from 'assets/img/nfts/Golf2.png';
import Golf3 from 'assets/img/nfts/Golf3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators.json';
import { tableColumnsTopCreators } from 'views/admin/marketplace/variables/tableColumnsTopCreators';
import DashboardMetrics from 'components/card/NewCard';
import CreateGolfTeamForm from 'components/card/CreateGolfTeamForm';
import PlayerProfile from 'components/card/PlayerInfo';
import TeamManagementForm from 'components/card/PlayerInfo';
import TeamManagementTable from 'components/card/TableTeam';


export default function TeamManagement() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	return (
		
		<Box pt={{ base: '400px', md: '80px', xl: '80px' }}>
			<DashboardMetrics/> 
			{/* <TeamManagementForm/> */}
			 <TeamManagementTable/>
			
			{/* Main Fields */}
			
			<Grid
				mb='20px'
				gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
				gap={{ base: '20px', xl: '20px' }}
				display={{ base: 'block', xl: 'grid' }}>
				{/* <Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
					<Flex direction='column'>
						<Flex
							mt='45px'
							mb='20px'
							justifyContent='space-between'
							direction={{ base: 'column', md: 'row' }}
							align={{ base: 'start', md: 'center' }}>
							<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
								Registered Teams
							</Text>

						</Flex>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
							<NFT
								name='Team Scramble'
								managedby='Admin - Paul Smith'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Golf1}
								teamscore='81'
								download='#'
							/>
							<NFT
								name='Team Golf Ladies'
								managedby='Admin - Nick Wilson'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Golf2}
								teamscore='90'
								download='#'
							/>
							<NFT
								name='Team Best Ballers'
								managedby='Admin - Will Smith'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Golf3}
								teamscore='60'
								download='#'
							/>
						</SimpleGrid>
	
						
					</Flex>
				</Flex> */}
				{/* <Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}> */}
					{/* <Card px='0px' mb='20px'> */}
						{/* <TableTopCreators tableData={tableDataTopCreators} columnsData={tableColumnsTopCreators} /> */}
					{/* </Card> */}
					{/* <Card p='0px'>
						<Flex
							align={{ sm: 'flex-start', lg: 'center' }}
							justify='space-between'
							w='100%'
							px='22px'
							py='18px'>
							<Text color={textColor} fontSize='xl' fontWeight='600'>
								Game History
							</Text>
							<Button variant='action'>See all</Button>
						</Flex>

						<HistoryItem
							name='Team Scrambler'
							author='Admin - Mark Benjamin'
							date='30s ago'
							image={Golf1}
							price='+10 Score'
						/>
						<HistoryItem
							name='Team Golf Clubbies'
							author='Admin - Esthera Jackson'
							date='58s ago'
							image={Golf1}
							price='+20 Score'
						/>
						<HistoryItem
							name='Team Never Give Up'
							author='Admin - Peter Will'
							date='1m ago'
							image={Golf3}
							price='+50 Score'
						/>

					</Card> */}
				{/* </Flex> */}
			</Grid>
			{/* Delete Product */}
		</Box>
	);
}
