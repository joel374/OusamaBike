import { Box } from "@chakra-ui/react";
import { RiImageAddLine } from "react-icons/ri";

const ImageBox = ({ desc }) => {
  return (
    <Box>
      <Box display={"flex"}>
        <Box display={"flex"}>
          <Box w="152px" h="160px" m="10px 0" mr="12px">
            <Box
              borderRadius={"8px"}
              border={"2px dashed var(--N100,#DBDEE2)"}
              w="140px"
              h="140px"
              verticalAlign={"middle"}
            >
              <Box
                display={"flex"}
                alignItems="center"
                flexDirection={"column"}
                fontWeight="normal"
                fontSize="14px"
                placeContent={"center"}
                justifyContent="center"
                w="140px"
                h="140px"
              >
                <Box>
                  <RiImageAddLine fontSize={"40px"} />
                </Box>
                <Box pt="12px">{desc}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageBox;
