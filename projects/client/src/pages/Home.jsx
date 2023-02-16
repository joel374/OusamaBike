import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import { fetchCategory, fetchProduct } from "../components/reuseable/fetch";

const Home = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const seeMoreBtnHandler = () => {
    seeMore ? setSeeMore(false) : setSeeMore(true);
  };

  useEffect(() => {
    fetchProduct().then((res) => setProduct(res));
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
              >
                Kategori
                <Box display={seeMore ? "block" : "none"}>
                  {category.map((val) => (
                    <Text>{val.category_name}</Text>
                  ))}
                </Box>
              </Box>
              <Box p="10px 8px 9px 12px">Merek</Box>
            </Box>
          </Box>
          <Box p="0px 4px 0px 30px">
            <Box mb="16px" />
            {/* Card */}
            <Grid templateColumns={"repeat(5,1fr)"}>
              {product.map((val) => (
                <Card
                  image_url={val.Image_Urls[0].image_url}
                  price={val.price}
                  product_name={val.product_name}
                  id={val.id}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
