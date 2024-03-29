import { Box, Grid, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";
import CardWishlist from "../components/CardWishlist";
import {
  deleteWishlist,
  fetchBrandCategory,
  fetchCategory,
  fetchWishlist,
} from "../components/reuseable/fetch";
import { heroColor } from "../components/reuseable/Logo";
import { doubleOnclick } from "./admin/ManageProduct";

export const tripleOnclick = (a, b, c) => {};

const Wishlist = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [seeMore2, setSeeMore2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  console.log(wishlist);

  const toast = useToast();

  const seeMoreBtnHandler = () => {
    seeMore ? setSeeMore(false) : setSeeMore(true);
  };

  const seeMoreBtnHandler2 = () => {
    seeMore2 ? setSeeMore2(false) : setSeeMore2(true);
  };

  useEffect(() => {
    fetchBrandCategory().then((res) => setBrand(res));
    fetchCategory().then((res) => setCategory(res));
    fetchWishlist().then((res) =>
      doubleOnclick(setWishlist(res), setIsLoading(true))
    );
  }, []);
  return (
    <Box>
      <Box w="1190px" m="40px auto 80px" p="0 32px">
        <Box mb="8px">
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
            Wishlist
          </Text>
        </Box>
        <Box fontSize={"24px"} fontWeight="bold">
          Wishlist
        </Box>
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
                {category?.map((val) => (
                  <Box
                    m="6px 0"
                    fontSize={"11.9px"}
                    fontWeight="normal"
                    display={"flex"}
                    alignItems="center"
                    ml="16px"
                    // onClick={() =>
                    //   fetchProduct("", "", val.id).then((res) =>
                    //     setProduct(res)
                    //   )
                    // }
                    cursor="pointer"
                  >
                    {val?.category_name}
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
                  <BiChevronUp fontSize={"24px"} />
                ) : (
                  <BiChevronDown fontSize={"24px"} />
                )}
              </Box>
              <Box display={seeMore2 ? "block" : "none"} pb="9px">
                {brand?.map((val) => (
                  <Box
                    m="6px 0"
                    fontSize={"11.9px"}
                    fontWeight="normal"
                    display={"flex"}
                    alignItems="center"
                    ml="16px"
                    // onClick={() =>
                    //   fetchProduct("", "", val.id).then((res) =>
                    //     setProduct(res)
                    //   )
                    // }
                    cursor="pointer"
                  >
                    {val?.brand_name}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box p="0px 4px 0px 30px">
            <Box mb="16px" />
            {/* Card */}
            <Grid templateColumns={"repeat(5,1fr)"}>
              {wishlist && isLoading
                ? Array.from(wishlist).map((val) => (
                    <CardWishlist
                      image_url={val.Product.Image_Urls[0]?.image_url}
                      price={val.Product.price}
                      product_name={val.Product.product_name}
                      id={val.Product.id}
                      key={val.id}
                      deleteHandler={() =>
                        doubleOnclick(
                          deleteWishlist(val.ProductId).then((res) =>
                            tripleOnclick(
                              res.error
                                ? toast({
                                    title: "Produk gagal dihapus dari wishlist",
                                    description: res,
                                    status: "error",
                                    variant: "top-accent",
                                  })
                                : toast({
                                    title: "Produk dihapus dari wishlist",
                                    description: res,
                                    status: "success",
                                    variant: "top-accent",
                                  }),
                              setIsLoading(false),
                              fetchWishlist().then((res) =>
                                doubleOnclick(
                                  setWishlist(res),
                                  setIsLoading(true)
                                )
                              )
                            )
                          )
                        )
                      }
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

export default Wishlist;
