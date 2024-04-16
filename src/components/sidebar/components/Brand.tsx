import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text 
				fontSize="2xl"      // Larger font size
				fontWeight="bold"   // Bold font weight
				color={logoColor}
				my="32px"
				letterSpacing="wider" // Wider letter spacing to stand out
				style={{
					fontFamily: 'Arial, sans-serif', // Custom font family, optional
					width: '100%',    // Ensuring it occupies the full width for better prominence
					textAlign: 'center' // Center text alignment if needed
				}}>
				Admin Page
			</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
