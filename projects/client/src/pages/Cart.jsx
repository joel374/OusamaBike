import { Box, Checkbox, Image, Text } from "@chakra-ui/react";
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
          <Box>
            <Box display={"flex"} alignItems={"center"} p="16px 0">
              <Checkbox mr="14px"></Checkbox>
              <Image
                h="69px"
                w="69px"
                objectFit={"cover"}
                src="https://images.unsplash.com/photo-1682276515739-a98a9650f8d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              />
              <Text pl="12px"> Testing</Text>
            </Box>
            <Box h="5px" bgColor={"var(--N50,#F3F4F5)"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
