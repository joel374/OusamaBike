import { Box } from "@chakra-ui/react";

const BoxHomeAdmin = ({ data, message }) => {
  return (
    <Box
      h="120px"
      w="550px"
      bgColor={"white"}
      borderRadius="8px"
      p="12px"
      fontSize={"18px"}
      fontWeight="bold"
    >
      {message}
      <Box fontSize={"44px"}>{data?.length}</Box>
    </Box>
  );
};

export default BoxHomeAdmin;
