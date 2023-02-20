import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../components/reuseable/fetch";
import { heroColor } from "../components/reuseable/Logo";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOver, setIsOver] = useState(false);
  console.log(product);
  const [image, setImage] = useState(
    isLoading && product?.Image_Urls[0]?.image_url
  );
  const params = useParams();

  const setProductLoading = () => {};

  useEffect(() => {
    fetchProduct(params.id).then((res) => setProduct(res));
  }, []);
  return (
    <Box p="19px 0 0 " mx="auto" w="1188px">
      <Box mb="19px">
        <Text fontSize={"12px"} display="flex" color={heroColor}>
          <Link to="/">Home </Link>
          <Text
            mr="2"
            ml="2"
            display={"inline"}
            color={"#6d7588"}
            fontSize="12px"
            mt="3px"
          >
            <AiOutlineRight />
          </Text>
          {product?.Category?.category_name}
          <Text
            mr="2"
            ml="2"
            display={"inline"}
            color={"#6d7588"}
            fontSize="12px"
            mt="3px"
          >
            <AiOutlineRight />
          </Text>
          {product?.Brand_Category?.brand_name}
          <Text
            mr="2"
            ml="2"
            display={"inline"}
            color={"#6d7588"}
            fontSize="12px"
            mt="3px"
          >
            <AiOutlineRight />
          </Text>
          <Text color={"black"}>{product?.product_name}</Text>
        </Text>
      </Box>
      <Grid templateColumns={"348px 468px auto"} gap="52px">
        <Box w="348px">
          <Box>
            <Image
              w="348px"
              h="348px"
              src={isOver ? isOver : image}
              onMouseOver={{ innerHeight: "200px" }}
              objectFit="cover"
            />
          </Box>
          <Box h="64px" display={"flex"} mt="8px">
            {product?.Image_Urls?.map((val) => (
              <Box
                pr="7px"
                onClick={() => setImage(val.image_url)}
                cursor={"pointer"}
              >
                <Image
                  key={val.id}
                  src={val.image_url}
                  border="2px solid white"
                  // onMouseOver={overHandler}
                  borderRadius={"8px"}
                  w="60px"
                  h="60px"
                  _hover={{ border: `2px solid ${heroColor}` }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box mb="4px">
          <Text fontSize={"18px"} fontWeight="bold" mb="16px">
            {product?.product_name}
          </Text>
          <Text fontSize={"28px"} fontWeight="extrabold">
            Rp{product?.price?.toLocaleString("id-ID")}
          </Text>
          <Box h="1px" backgroundColor={"var(--NN50,#F0F3F7)"} m="16px 0"></Box>
          <Box fontSize={"14px"} color="var(--NN600,#6D7588)">
            <Text mb="4px">
              Kategori:{" "}
              <Text display={"inline"} color="black" fontWeight={"bold"}>
                {product?.Category?.category_name}
              </Text>
            </Text>
            <Text mb="4px">
              Merek:{" "}
              <Text display={"inline"} color="black" fontWeight={"bold"}>
                {product?.Brand_Category?.brand_name}
              </Text>
            </Text>
          </Box>
          <Box mt="12px" fontSize={"14px"} whiteSpace="nowrap">
            {product?.description}
          </Box>
        </Box>
        <Box>
          <Box
            p="0 12px"
            border={"1px solid var(--NN300,#BFC9D9)"}
            borderRadius="8px"
            fontSize={"14px"}
          >
            <Text m="12px 0">
              Stok:{" "}
              <Text fontWeight={"bold"} display="inline">
                {product?.stock}
              </Text>
            </Text>
            <Box>
              <Button
                w="100%"
                mb="8px"
                _hover={false}
                _active={false}
                bgColor={heroColor}
                color="white"
                fontSize={"14px"}
              >
                Wishlist
              </Button>
              <Button
                w="100%"
                mb="12px"
                border={`1px solid ${heroColor}`}
                bgColor="white"
                color={heroColor}
                _hover={false}
                _active={false}
                fontSize={"14px"}
              >
                Chat
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Product;