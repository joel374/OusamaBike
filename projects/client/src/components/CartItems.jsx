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
            src="https://images.unsplash.com/photo-1682276515739-a98a9650f8d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
          <Box pl="12px">
            <Text fontWeight={"normal"}>Testing</Text>
            <Text mt="8px">Rp. 15.000</Text>
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
              1
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
