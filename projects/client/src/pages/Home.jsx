import { Box } from "@chakra-ui/react";
import CarouselSlider from "../components/Carousel";
import ChoiceCategory from "../components/ChoiceCategory";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <Box>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pusatnya sepeda | OusamaBike</title>
      </Helmet>
      <CarouselSlider />
      <ChoiceCategory />
    </Box>
  );
};

export default Home;
