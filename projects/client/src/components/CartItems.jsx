import { Box, Checkbox, Image, Text } from "@chakra-ui/react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const CartItems = ({ product_name, price, image_url, quantity }) => {
  return (
    <Box fontSize={"14px"}>
      <Box p="16px 0">
        <Box display={"flex"}>
          <Checkbox mr="14px"></Checkbox>
          <Image
            h="69px"
            w="69px"
            objectFit={"cover"}
            src={`${process.env.REACT_APP_API_IMAGE_URL}${image_url}`}
          />
          <Box pl="12px">
            <Text fontWeight={"normal"}>{product_name}</Text>
            <Text mt="8px">Rp. {price.toLocaleString("id-ID")}</Text>
          </Box>
        </Box>
        <Box mt="16px" display={"flex"} justifyContent={"end"}>
          <Box display={"flex"} alignItems={"center"}>
            <BiMinusCircle fontSize={"20px"} />
            <Box
              w="55px"
              borderBottom={"1px solid black"}
              fontWeight={"normal"}
              textAlign={"center"}
            >
              {quantity}
            </Box>
            <BiPlusCircle fontSize={"20px"} />
          </Box>
        </Box>
      </Box>
      <Box h="5px" bgColor={"var(--N50,#F3F4F5)"} />
    </Box>
  );
};

export default CartItems;
