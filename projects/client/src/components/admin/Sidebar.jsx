import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ImHome2 } from "react-icons/im";
import { CgBox } from "react-icons/cg";
import { GrFormDown, GrFormUp } from "react-icons/gr";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
  const [openSelect, setOpenSelect] = useState(false);
  const selectBtnHandler = () => {
    openSelect === true ? setOpenSelect(false) : setOpenSelect(true);
  };
  const [openSelectCat, setOpenSelectCat] = useState(false);
  const selectBtnHandlerCat = () => {
    openSelectCat === true ? setOpenSelectCat(false) : setOpenSelectCat(true);
  };
  return (
    <Box
      h="100vh"
      w="237px"
      position={"fixed"}
      bgColor="white"
      fontSize={"12px"}
      fontWeight="bold"
    >
      <Box _hover={{ backgroundColor: "var(--N50,#F3F4F5)" }}>
        <Link to="/admin">
          <Box my="auto" h="36px" pl="3px" pr="12px">
            <Box p="8px 10px" display={"flex"} alignItems="center">
              <Box display={"inline"} mr="8px">
                <ImHome2 fontSize={"21px"} />
              </Box>
              Home
            </Box>
          </Box>
        </Link>
      </Box>
      <Box
        _hover={{ backgroundColor: "var(--N50,#F3F4F5)" }}
        onClick={selectBtnHandler}
      >
        <Box
          my="auto"
          h="36px"
          pl="3px"
          pr="12px"
          display={"flex"}
          justifyContent="space-between"
        >
          <Box p="8px 10px" display={"flex"} alignItems="center">
            <Box display={"inline"} mr="8px">
              <CgBox fontSize={"21px"} />
            </Box>
            Produk
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            fontSize={"21px"}
            top="2px"
          >
            {openSelect ? <GrFormUp /> : <GrFormDown />}
          </Box>
        </Box>
      </Box>
      <Box
        display={openSelect === true ? "block" : "none"}
        fontWeight="normal"
        bgColor={"white"}
      >
        <Link to="/admin/add-product">
          <Box m="2px 0" pl="29px">
            <Box
              p="4px 0"
              pl="12px"
              borderLeftRadius={"8px"}
              _hover={{
                backgroundColor: "var(--N50,#F3F4F5)",
                fontWeight: "bold",
              }}
            >
              Tambah Produk
            </Box>
          </Box>
        </Link>
        <Link to="/admin/manage-product">
          <Box m="2px 0" pl="29px">
            <Box
              p="4px 0"
              pl="12px"
              borderLeftRadius={"8px"}
              _hover={{
                backgroundColor: "var(--N50,#F3F4F5)",
                fontWeight: "bold",
              }}
            >
              Daftar Produk
            </Box>
          </Box>
        </Link>
      </Box>
      <Box
        _hover={{ backgroundColor: "var(--N50,#F3F4F5)" }}
        onClick={selectBtnHandlerCat}
      >
        <Box
          my="auto"
          h="36px"
          pl="3px"
          pr="12px"
          display={"flex"}
          justifyContent="space-between"
        >
          <Box p="8px 10px" display={"flex"} alignItems="center">
            <Box display={"inline"} mr="8px">
              <BiCategory fontSize={"21px"} />
            </Box>
            Kategori & Merek
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            fontSize={"21px"}
            top="2px"
          >
            {openSelectCat ? <GrFormUp /> : <GrFormDown />}
          </Box>
        </Box>
      </Box>
      <Box
        display={openSelectCat === true ? "block" : "none"}
        fontWeight="normal"
        bgColor={"white"}
      >
        <Link to="/admin/manage-category">
          <Box m="2px 0" pl="29px">
            <Box
              p="4px 0"
              pl="12px"
              borderLeftRadius={"8px"}
              _hover={{
                backgroundColor: "var(--N50,#F3F4F5)",
                fontWeight: "bold",
              }}
            >
              Daftar Kategori
            </Box>
          </Box>
        </Link>
        <Link to="/admin/manage-brand">
          <Box m="2px 0" pl="29px">
            <Box
              p="4px 0"
              pl="12px"
              borderLeftRadius={"8px"}
              _hover={{
                backgroundColor: "var(--N50,#F3F4F5)",
                fontWeight: "bold",
              }}
            >
              Daftar Merek
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
