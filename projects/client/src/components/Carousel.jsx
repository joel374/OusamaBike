import React from "react";
import {
  Box,
  IconButton,
  SlideFade,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { heroColor } from "./reuseable/Logo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);
  const [display, setDisplay] = React.useState("none");

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  const cards = [
    "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  ];

  return (
    <Box display="flex" justifyContent={"center"}>
      <Box
        position={"relative"}
        width={"1208px"}
        borderRadius={"12px"}
        p="24px 0"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {display && (
          <>
            <IconButton
              aria-label="left-arrow"
              color={heroColor}
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(-70%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <FaChevronLeft />
            </IconButton>

            <IconButton
              aria-label="right-arrow"
              color={heroColor}
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(70%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <FaChevronRight />
            </IconButton>
          </>
        )}
        <Box h="350px" overflow="hidden" borderRadius={"12px"}>
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((url, index) => (
              <Box
                key={index}
                height={"6xl"}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                borderRadius={"12px"}
                backgroundImage={`url(${url})`}
              />
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
