import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = ({ image_url, product_name, price, id }) => {
  return (
    <Link to={`${product_name.replace(/\s+/g, "-").toLowerCase()}/${id}`}>
      <Box p="0px 8px 16px">
        <Box
          w="175.5px"
          boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
          borderRadius="9px"
        >
          <Image
            src={image_url}
            h="175.55px"
            objectFit={"cover"}
            objectPosition={"center center"}
            borderTopRadius="9px"
          />
          <Box p="8px">
            <Box mb="4px" fontSize={"12.04px"}>
              <Text textOverflow="ellipsis" overflow={"hidden"} h="36.1px">
                {product_name}
              </Text>
            </Box>
            <Box mb="4px" fontSize={"14px"} fontWeight="bold">
              Rp{price?.toLocaleString("id-ID")}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
