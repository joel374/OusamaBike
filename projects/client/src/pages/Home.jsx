import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <Box>
      <Box mx="auto" w="1190px" mt="36px" mb="50px">
        <Box display={"flex"}>
          <Box p="0 4px" w="214px" fontSize={"14px"} fontWeight="bold">
            <Text m="16px 0">Filter</Text>
            <Box
              boxShadow={"rgb(49 53 59 / 12%) 0px 1px 6px 0px"}
              borderRadius="12px"
            >
              <Box
                p="10px 8px 9px 12px"
                h={seeMore}
                onClick={() => setSeeMore("200px")}
              >
                Kategori
              </Box>
              <Box p="10px 8px 9px 12px">Merek</Box>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
