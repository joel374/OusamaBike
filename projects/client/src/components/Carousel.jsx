import React from "react";
import {
  Box,
  IconButton,
  Image,
  // SlideFade,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { heroColor } from "./reuseable/Logo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../assets/ImageSlider/Banner-Slider-1.jpg";
import image2 from "../assets/ImageSlider/Banner-Slider-2.jpg";
import image3 from "../assets/ImageSlider/Banner-Slider-3.jpg";
import image4 from "../assets/ImageSlider/Banner-Slider-4.jpg";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToScroll: true,
  swipeToSlide: true,
  lazyLoad: true,
  initialSlide: 0,
  appendDots: (dots) => (
    <Box>
      <UnorderedList marginBottom={"50px"} color={"white"}>
        {dots}
      </UnorderedList>
    </Box>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
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
  const cards = [image1, image2, image3, image4];

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
        <Box borderRadius={"12px"}>
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((url, index) => (
              <Image
                key={index}
                height="375px"
                position="relative"
                borderRadius={"12px"}
                src={url}
              />
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
