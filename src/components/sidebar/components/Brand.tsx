import { Flex, Text, useColorModeValue, Image } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';
import GolfProLogo from 'assets/img/dashboards/Golf4.png';

export function SidebarBrand() {
    let logoColor = useColorModeValue('green.700', 'white');

    return (
        <Flex alignItems='center' flexDirection='column'>
            <Flex alignItems='center'>
                <Image src={GolfProLogo} alt="Golf Pro Logo" boxSize="50px" mr="8px" />
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
                    Golf Pro
                </Text>
            </Flex>
            <HSeparator mb='20px' />
        </Flex>
    );
}

export default SidebarBrand;
