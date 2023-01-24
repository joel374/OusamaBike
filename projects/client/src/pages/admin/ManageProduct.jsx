import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import { TbSearch } from "react-icons/tb";

const ManageProduct = () => {
  return (
    <Box pl="237px" bgColor={"var(--N50,#F3F4F5)"} fontSize="14px" h="100%">
      <Box p="24px">
        {/* Header */}
        <Box
          pt="24px"
          mb="22px"
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text fontSize={"24px"} fontWeight="bold">
            Daftar Produk
          </Text>
          <Button>+ Tambah Produk</Button>
        </Box>
        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box h="53px" borderBottom={"1px solid var(--N75,#E5E7E9)"}>
            <Box display={"flex"} alignContent="center" fontWeight={"bold"}>
              <Box p="16px 24px">Semua Produk(0)</Box>
              <Box p="16px 24px">Aktif(0)</Box>
            </Box>
          </Box>
          <Box pt="16px" minH={"584px"}>
            <Box pl="24px" pr="32px" pb="12px">
              <Box>
                <InputGroup>
                  <Input
                    placeholder="Cari nama produk atau SKU"
                    _placeholder={{ fontSize: "14px" }}
                    w="234px"
                    borderRightRadius={"0"}
                  />
                  <Button
                    borderLeftRadius={"0"}
                    type="submit"
                    bgColor={"white"}
                    _hover={false}
                    border="1px solid #e2e8f0"
                    borderLeft={"0px"}
                  >
                    <TbSearch />
                  </Button>
                </InputGroup>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageProduct;
