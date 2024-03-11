import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const Bar = () => {
    const navigate = useNavigate();
    return (
        <Grid templateColumns={"repeat(2,1fr)"} h='125px'
            bgColor={'#222222'}
            fontWeight={'400'}
            w='100%'
            position={'fixed'}
            left='0'
            right={'0'}
            top='0'
            zIndex={'99999'}
        >
            <GridItem display={'flex'} alignItems={'center'}>
                <Image src={logo} h='120px' onClick={() => navigate('/')} ml='80px' />
            </GridItem>
            <GridItem display={'flex'} alignItems={'center'}>
                <Box w='100%' textAlign={'right'}>
                    <Text textDecoration={'underline'} color={'#F3C03D'} mr={'80px'}>
                        Butuh Bantuan?
                    </Text>
                </Box>
            </GridItem>
        </Grid>
    )
}

export default Bar