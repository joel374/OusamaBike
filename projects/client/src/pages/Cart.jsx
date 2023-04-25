import { Box, Checkbox, Image, Text } from "@chakra-ui/react";
import CartItems from "../components/CartItems";
const Cart = () => {
  return (
    <Box p="19px 0 0 " mx="auto" w="1188px">
      <Box p="0 20px" pt="40px" fontSize="20px" fontWeight={"bold"}>
        <Box>Keranjang</Box>

        <Box w="677px">
          <Box p="16px 0" display={"flex"} alignItems={"center"}>
            <Checkbox>
              <Text fontWeight={"normal"} fontSize={"14px"}>
                Pilih Semua
              </Text>
            </Checkbox>
          </Box>
          <Box h="5px" bgColor={"var(--N50,#F3F4F5)"} />
          {/* Cart Items */}
          <CartItems />
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
