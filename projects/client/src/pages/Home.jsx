import { Box } from '@chakra-ui/react';
import CarouselSlider from '../components/Carousel';
import ChoiceCategory from '../components/ChoiceCategory';
import { Helmet } from 'react-helmet';
const Home = () => {
  return (
    <Box p='19px 0 0 ' mx='auto' w='1188px' mt='65px'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Pusatnya sepeda | OusamaBike</title>
      </Helmet>
      <CarouselSlider />
      <ChoiceCategory />
    </Box>
  );
};

export default Home;
