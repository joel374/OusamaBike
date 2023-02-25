import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { BsPencil, BsTrash } from "react-icons/bs";
import { fetchProduct } from "../../components/reuseable/fetch";
import { axiosInstance } from "../../api";
import Alert from "../../components/reuseable/Alert";
import { heroColor } from "../../components/reuseable/Logo";
import { Link } from "react-router-dom";

export const doubleOnclick = (function1, function2) => {};

const ManageProduct = () => {
  const [product, setProduct] = useState([]);
  const [productActive, setProductActive] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [icon, setIcon] = useState(false);
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };
  const toast = useToast();
  const cancelRef = React.useRef();

  console.log(productActive);

  const deleteHandler = async (id) => {
    try {
      const response = await axiosInstance.delete(`/product/delete/${id}`);

      toast({
        title: "Produk dihapus",
        status: "success",
        variant: "top-accent",
        description: response.data.message,
      });
      fetchProduct().then((res) => setProduct(res));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchProduct().then((res) => setProduct(res));
    fetchProduct("", 1).then((res) => setProductActive(res));
  }, []);
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
          <Link to={"/admin/add-product"}>
            <Button bgColor={heroColor} color="white">
              + Tambah Produk
            </Button>
          </Link>
        </Box>

        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
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

            <Box>
              <Box
                borderBottom={"1px solid var(--N75,#E5E7E9)"}
                borderTop={"1px solid var(--N75,#E5E7E9)"}
                p="7px 16px"
              >
                <Box
                  display={"flex"}
                  alignItems="center"
                  fontWeight={"semibold"}
                  fontSize="12px"
                >
                  <Box pl="7px" pr="32px" w="45%">
                    INFO PRODUK
                  </Box>
                  <Box w="30%">HARGA</Box>
                  <Box w="25%">STOK</Box>
                  <Box w="16%">STATUS</Box>
                  <Box w="6%"> </Box>
                </Box>
              </Box>

              {product.map((val) => {
                return (
                  <Box
                    borderBottom={"1px solid var(--N75,#E5E7E9)"}
                    p="7px 16px"
                  >
                    <Box
                      display={"flex"}
                      alignItems="center"
                      fontWeight={"bold"}
                      fontSize="14px"
                    >
                      <Box pl="7px" pr="32px" w="45%">
                        <Box display={"flex"}>
                          <Box>
                            <Image
                              src={val.Image_Urls[0]?.image_url}
                              w="56px"
                              h="56px"
                            />
                          </Box>
                          <Box pl="12px" pr="32px" h="82px">
                            <Text
                              maxH={"66px"}
                              overflow="hidden"
                              textOverflow={"ellipsis"}
                            >
                              {val?.product_name}
                            </Text>
                            <Text fontWeight={"normal"}>
                              SKU:{val?.SKU ? val.SKU : "-"}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box w="30%">
                        <Box w="180px" mb="8px">
                          Rp{val?.price?.toLocaleString("id-ID")}
                        </Box>
                      </Box>
                      <Box w="25%">{val?.stock}</Box>
                      <Box w="16%">{val?.is_active ? "AKTIF" : "NONAKTIF"}</Box>
                      <Box>
                        <Menu>
                          <MenuButton
                            as={Button}
                            onClick={iconHandler}
                            _hover={false}
                            _active={false}
                            rightIcon={
                              icon ? <ChevronDownIcon /> : <ChevronUpIcon />
                            }
                            fontSize="12px"
                            h="30px"
                            bgColor={"transparent"}
                            border="1px solid var(--color-border,#E5E7E9)"
                          >
                            Atur
                          </MenuButton>
                          <MenuList fontSize={"12px"}>
                            <Link
                              to={`/admin/edit-product/${val.product_name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}/${val.id}`}
                            >
                              <MenuItem
                                p="6px 12px"
                                h="36px"
                                // onClick={() => setAlert(val)}
                              >
                                <Box mr="8px">
                                  <BsPencil fontSize={"18px"} />
                                </Box>
                                Edit
                              </MenuItem>
                            </Link>
                            <MenuItem
                              p="6px 12px"
                              h="36px"
                              onClick={() => setDeleteAlert(val)}
                              value={val.id}
                            >
                              <Box mr="8px">
                                <BsTrash fontSize={"18px"} />
                              </Box>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      <Alert
        // key={deleteAlert?.id.toString()}
        body={deleteAlert?.product_name}
        header="Hapus Produk?"
        responsive="Hapus Produk?"
        isOpen={deleteAlert}
        cancelRef={cancelRef}
        color={heroColor}
        leftButton="Batalkan"
        rightButton={"Hapus"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() =>
          doubleOnclick(deleteHandler(deleteAlert?.id), setDeleteAlert(null))
        }
      />
    </Box>
  );
};

export default ManageProduct;
