import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Image, UnorderedList } from "@chakra-ui/react";
import slider1 from "../assets/ImageSlider/Banner-Slider-1.jpg";
import slider2 from "../assets/ImageSlider/Banner-Slider-2.jpg";
import slider3 from "../assets/ImageSlider/Banner-Slider-3.jpg";
import slider4 from "../assets/ImageSlider/Banner-Slider-4.jpg";
import slider5 from "../assets/ImageSlider/Banner-Slider-5.jpg";

import React, { useState } from "react";

const CarouselSlider = () => {
  const [display, setDisplay] = useState("none");
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1200,
    swipeToSlide: true,
    lazyLoad: true,
    initialSlide: 0,
    appendDots: (dots) => (
      <Box p={"30px"}>
        <UnorderedList margin={"1px"} color={"white"}>
          {" "}
          {dots}{" "}
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

  const myStyle = {
    display: true,
    width: 1200,
    height: "375px",
    borderRadius: "15px",
  };

  const slider = React.useRef(null);
  return (
    <>
      <Box
        mx={"auto"}
        mt={"70px"}
        style={myStyle}
        cursor={"pointer"}
        mb={"20px"}
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        <Slider ref={slider} {...settings}>
          <Box>
            <Image
              src={slider1}
              borderRadius={"15px"}
              height={"375px"}
              width={"1200px"}
            />
          </Box>
          <Box>
            <Image
              src={slider2}
              borderRadius={"15px"}
              height={"375px"}
              width={"1200px"}
            />
          </Box>
          <Box>
            <Image
              src={slider3}
              borderRadius={"15px"}
              height={"375px"}
              width={"1200px"}
            />
          </Box>
          <Box>
            <Image
              src={slider4}
              borderRadius={"15px"}
              height={"375px"}
              width={"1200px"}
            />
          </Box>
          <Box>
            <Image
              src={slider5}
              borderRadius={"15px"}
              height={"375px"}
              width={"1200px"}
            />
          </Box>
        </Slider>
        <Box
          display={"flex"}
          width={"1240px"}
          justifyContent={"space-between"}
          ml={"-20px"}
          mt={"-210px"}
        >
          {display && (
            <>
              <Button
                onClick={() => slider?.current?.slickPrev()}
                borderRadius={"50%"}
                w="40px"
                h="40px"
                color={"#edbf69"}
                _hover={{
                  bgColor: "#edbf69",
                  color: "white",
                }}
              >
                ❮
              </Button>
              <Button
                onClick={() => slider?.current?.slickNext()}
                borderRadius={"50%"}
                w="40px"
                h="40px"
                color={"#edbf69"}
                _hover={{
                  bgColor: "#edbf69",
                  color: "white",
                }}
              >
                ❯
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CarouselSlider;
