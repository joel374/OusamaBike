import { Box, Checkbox, Image, Text } from "@chakra-ui/react";
import CartItems from "../components/CartItems";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartSelector = useSelector((state) => state.cart);

  const renderCart = () => {
    return cartSelector.myCart.map((val) => {
      return (
        <CartItems
          image_url={val.Product.Image_Urls[0].image_url}
          price={val.Product.price}
          product_name={val.Product.product_name}
          quantity={val.quantity}
        />
      );
    });
  };

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
          {renderCart()}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
