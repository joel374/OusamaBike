import { Box } from "@chakra-ui/react";

const BottomBar = () => {
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      position={"sticky"}
      //   position="relative"
      left="0"
      right={"0"}
      bottom=""
      display={{ lg: "none", md: "block", base: "block" }}
      zIndex="9998"
      backgroundColor={"red"}
    >
      Hallo
    </Box>
  );
};

export default BottomBar;
