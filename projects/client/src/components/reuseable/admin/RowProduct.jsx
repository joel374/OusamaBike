import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const RowProduct = ({
  deleteHandler,
  id,
  image_url,
  SKU,
  price,
  is_active,
  product_name,
  stock,
}) => {
  const [icon, setIcon] = useState(false);
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };
  return (
    <Box borderBottom={"1px solid var(--N75,#E5E7E9)"} p="7px 16px">
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
                src={`${process.env.REACT_APP_API_IMAGE_URL}${image_url}`}
                w="56px"
                h="56px"
              />
            </Box>
            <Box pl="12px" pr="32px" h="82px">
              <Text maxH={"66px"} overflow="hidden" textOverflow={"ellipsis"}>
                {product_name}
              </Text>
              <Text fontWeight={"normal"}>SKU:{SKU ? SKU : "-"}</Text>
            </Box>
          </Box>
        </Box>
        <Box w="30%">
          <Box w="180px" mb="8px">
            Rp{price?.toLocaleString("id-ID")}
          </Box>
        </Box>
        <Box w="25%">{stock}</Box>
        <Box w="16%">{is_active ? "AKTIF" : "NONAKTIF"}</Box>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              onClick={iconHandler}
              _hover={false}
              _active={false}
              rightIcon={icon ? <ChevronUpIcon /> : <ChevronDownIcon />}
              fontSize="12px"
              h="30px"
              bgColor={"transparent"}
              border="1px solid var(--color-border,#E5E7E9)"
            >
              Atur
            </MenuButton>
            <MenuList fontSize={"12px"}>
              <Link
                to={`/admin/edit-product/${product_name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${id}`}
              >
                <MenuItem
                  p="6px 12px"
                  h="36px"
                  // onClick={() => setAlert(}
                >
                  <Box mr="8px">
                    <BsPencil fontSize={"18px"} />
                  </Box>
                  Edit
                </MenuItem>
              </Link>
              <MenuItem p="6px 12px" h="36px" onClick={deleteHandler} e={id}>
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
};

export default RowProduct;
