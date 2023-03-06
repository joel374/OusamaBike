import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  fetchBrandCategory,
  fetchCategory,
  fetchProduct,
} from "../../components/reuseable/fetch";

const HomeAdmin = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    fetchProduct("", true).then((res) => setProduct(res));
    fetchCategory().then((res) => setCategory(res));
    fetchBrandCategory().then((res) => setBrand(res));
  }, []);
  return (
    <>
      <Box bgColor={"var(--N50,#F3F4F5)"} h="full" pl="237px">
        <Box p="32px 16px" display={"flex"}>
          <Box
            h="120px"
            w="550px"
            bgColor={"white"}
            borderRadius="8px"
            p="12px"
            fontSize={"18px"}
            fontWeight="bold"
          >
            Jumlah Produk Aktif
            <Box fontSize={"44px"}>{product?.length}</Box>
          </Box>
          <Box
            h="120px"
            w="550px"
            bgColor={"white"}
            borderRadius="8px"
            p="12px"
            fontSize={"18px"}
            fontWeight="bold"
            ml="16px"
          >
            Jumlah Kategori
            <Box fontSize={"44px"}>{category?.length}</Box>
          </Box>
          <Box
            h="120px"
            w="550px"
            bgColor={"white"}
            borderRadius="8px"
            p="12px"
            fontSize={"18px"}
            fontWeight="bold"
            ml="16px"
          >
            Jumlah Merek
            <Box fontSize={"44px"}>{brand?.length}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeAdmin;
