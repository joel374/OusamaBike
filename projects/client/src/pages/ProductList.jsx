import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import {
  fetchBrandCategory,
  fetchCategory,
  fetchProduct,
} from "../components/reuseable/fetch";
import { doubleOnclick } from "./admin/ManageProduct";

const ProductList = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const seeMoreBtnHandler = () => {
    seeMore ? setSeeMore(false) : setSeeMore(true);
  };

  const seeMoreBtnHandler2 = () => {
    seeMore2 ? setSeeMore2(false) : setSeeMore2(true);
  };

  const categoryHandler = ({ target }) => {
    const { value } = target;
    console.log(value);
    const params = {};
    params["kategori"] = value;
    setSearchParams(params);
    fetchProduct("", "", value).then((res) => setProduct(res));
  };

  useEffect(() => {
    fetchProduct("", true).then((res) =>
      doubleOnclick(setProduct(res), setIsLoading(true))
    );
    fetchCategory().then((res) => setCategory(res));
    fetchBrandCategory().then((res) => setBrand(res));
  }, []);
  return (
    <Box>
      <Box
        mx="auto"
        w={{ lg: "1190px", md: "auto", base: "auto" }}
        mt={{ lg: "36px", md: "0px", base: "0" }}
        mb="50px"
      >
        <Box display={"flex"}>
          <Box
            w="214px"
            fontSize={"14px"}
            fontWeight="bold"
            display={{ lg: "block", md: "none", base: "none" }}
          >
            <Text m={"16px 0"}>Filter</Text>
            <Box
              boxShadow={"rgb(49 53 59 / 12%) 0px 1px 6px 0px"}
              borderRadius="12px"
            >
              <Box
                p="10px 8px 9px 12px"
                onClick={() => seeMoreBtnHandler()}
                cursor="pointer"
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
              >
                Kategori
                {seeMore ? (
                  <Box
                    _hover={{
                      borderRadius: "50%",
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                  >
                    <BiChevronUp fontSize={"24px"} />
                  </Box>
                ) : (
                  <Box
                    _hover={{
                      borderRadius: "50%",
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                  >
                    <BiChevronDown fontSize={"24px"} />
                  </Box>
                )}
              </Box>
              <Box display={seeMore ? "block" : "none"}>
                {category?.map((val) => (
                  <Box
                    _hover={{
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                    borderRadius="8px"
                    cursor="pointer"
                    ml="16px"
                    mr="12px"
                    pl="12px"
                  >
                    <Button
                      w={"100%"}
                      fontSize={"11.9px"}
                      fontWeight="normal"
                      onClick={categoryHandler}
                      _hover={false}
                      _active={false}
                      value={val.id}
                      bgColor={"transparent"}
                      m="0"
                      p="0"
                      justifyContent={"start"}
                    >
                      {val?.category_name}
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box
                p="10px 8px 9px 12px"
                onClick={() => seeMoreBtnHandler2()}
                cursor="pointer"
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
                borderTop="1px solid #edf2f7"
              >
                Merek
                {seeMore2 ? (
                  <Box
                    _hover={{
                      borderRadius: "50%",
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                  >
                    <BiChevronUp fontSize={"24px"} />
                  </Box>
                ) : (
                  <Box
                    _hover={{
                      borderRadius: "50%",
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                  >
                    <BiChevronDown fontSize={"24px"} />
                  </Box>
                )}
              </Box>
              <Box display={seeMore2 ? "block" : "none"} pb="9px">
                {brand?.map((val) => (
                  <Box
                    p="6px 0"
                    fontSize={"11.9px"}
                    fontWeight="normal"
                    display={"flex"}
                    alignItems="center"
                    ml="16px"
                    pl="12px"
                    borderRadius={"8px"}
                    _hover={{
                      bgColor: "var(--N50,#F3F4F5)",
                    }}
                    onClick={() =>
                      fetchProduct("", "", val.id).then((res) =>
                        setProduct(res)
                      )
                    }
                    cursor="pointer"
                  >
                    {val?.brand_name}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            p={{ lg: "0px 4px 0px 30px", md: "none", base: "none" }}
            w="100%"
          >
            <Box
              mb="16px"
              display={{ lg: "block", md: "none", base: "none" }}
            />
            {!product && isLoading ? (
              <Box p="10px" bgColor={"#E5F9F6"}>
                <Box mx="auto">
                  <Box display={"flex"}>
                    <IoIosAlert fontSize={"25px"} color="#0095DA" />
                    <Text fontWeight="medium" ml="2">
                      Produk tidak ditemukan
                    </Text>
                  </Box>
                </Box>
              </Box>
            ) : null}
            {/* Card */}
            <Grid
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                base: "repeat(2,.1fr)",
              }}
              w="375px"
              mt="10px"
              pl="8px"
            >
              {isLoading &&
                product?.map((val) => (
                  <Card
                    image_url={val.Image_Urls[0]?.image_url}
                    price={val.price}
                    product_name={val.product_name}
                    id={val.id}
                  />
                ))}
              {isLoading === false ? "Loading Broo" : null}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductList;
