import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { axiosInstance } from "../../api";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { BsPencil, BsTrash } from "react-icons/bs";

const ManageProduct = () => {
  const [product, setProduct] = useState([]);
  const [icon, setIcon] = useState(false);
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/product/get");
      console.log(response);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchProduct();
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
          <Button>+ Tambah Produk</Button>
        </Box>
        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box h="53px" borderBottom={"1px solid var(--N75,#E5E7E9)"}>
            <Box display={"flex"} alignContent="center" fontWeight={"bold"}>
              <Box p="16px 24px">Semua Produk ({product?.length})</Box>
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
                  <Box w="16%">AKTIF</Box>
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
                          <InputGroup>
                            <InputLeftAddon children="Rp" fontSize={"14px"} />
                            <Input
                              type="number"
                              value={val?.price.toLocaleString("id-ID")}
                              fontSize="14px"
                            />
                          </InputGroup>
                        </Box>
                      </Box>
                      <Box w="25%">
                        <Box>
                          <Input
                            w="94px"
                            type="number"
                            value={val?.stock}
                            fontSize="14px"
                          />
                        </Box>
                      </Box>
                      <Box w="16%">
                        {val?.is_active === 0 ? (
                          <Switch />
                        ) : (
                          <Switch isChecked />
                        )}
                      </Box>
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
                            <MenuItem p="6px 12px" h="36px">
                              <Box mr="8px">
                                <BsPencil fontSize={"18px"} />
                              </Box>
                              Edit
                            </MenuItem>
                            <MenuItem p="6px 12px" h="36px">
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
    </Box>
  );
};

export default ManageProduct;
