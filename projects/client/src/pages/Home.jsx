import { Box } from "@chakra-ui/react";
import CarouselSlider from "../components/Carousel";
import ChoiceCategory from "../components/ChoiceCategory";
const Home = () => {
  return (
    <Box>
      <CarouselSlider />
      <ChoiceCategory />
    </Box>
  );
};

export default Home;
