import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

const RowCategoryAndBrand = ({ brand_name, createdAt, id, deleteHandler }) => {
  const [icon, setIcon] = useState(false);
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };
  <Box borderBottom={"1px solid var(--N75,#E5E7E9)"} p="7px 16px">
    <Box
      display={"flex"}
      alignItems="center"
      fontWeight={"bold"}
      fontSize="14px"
    >
      hallo
      <Box pl="7px" pr="32px" w="33%">
        {brand_name || "Testing kok gk muncul anjer"}
      </Box>
      <Box w="33%">{moment(createdAt).format("LLLL")}</Box>
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

            <MenuItem p="6px 12px" h="36px" onClick={deleteHandler} value={id}>
              <Box mr="8px">
                <BsTrash fontSize={"18px"} />
              </Box>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  </Box>;
};
export default RowCategoryAndBrand;
