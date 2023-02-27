import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Card from "../components/Card";
import { fetchCategory, fetchProduct } from "../components/reuseable/fetch";
import { doubleOnclick } from "./admin/ManageProduct";

const Home = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const seeMoreBtnHandler = () => {
    seeMore ? setSeeMore(false) : setSeeMore(true);
  };

  useEffect(() => {
    fetchProduct("", true).then((res) =>
      doubleOnclick(setProduct(res), setIsLoading(true))
    );
    fetchCategory().then((res) => setCategory(res));
  }, []);
  return (
    <Box>
      <Box mx="auto" w="1190px" mt="36px" mb="50px">
        <Box display={"flex"}>
          <Box w="214px" fontSize={"14px"} fontWeight="bold">
            <Text m="16px 0">Filter</Text>
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
                  <BiChevronUp fontSize={"24px"} />
                ) : (
                  <BiChevronDown fontSize={"24px"} />
                )}
              </Box>
              <Box display={seeMore ? "block" : "none"}>
                {category.map((val) => (
                  <Box
                    m="6px 0"
                    fontSize={"11.9px"}
                    fontWeight="normal"
                    display={"flex"}
                    alignItems="center"
                    ml="16px"
                  >
                    {val?.category_name}
                  </Box>
                ))}
              </Box>
              <Box p="10px 8px 9px 12px">Merek</Box>
            </Box>
          </Box>
          <Box p="0px 4px 0px 30px">
            <Box mb="16px" />
            {/* Card */}
            <Grid templateColumns={"repeat(5,1fr)"}>
              {product && isLoading
                ? product.map((val) => (
                    <Card
                      image_url={val.Image_Urls[0]?.image_url}
                      price={val.price}
                      product_name={val.product_name}
                      id={val.id}
                    />
                  ))
                : "Loading Broo"}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
