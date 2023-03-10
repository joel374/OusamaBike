import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { TbSearch } from "react-icons/tb";
import Alert from "../../components/reuseable/Alert";
import {
  deleteCategory,
  fetchCategory,
} from "../../components/reuseable/fetch";
import { heroColor } from "../../components/reuseable/Logo";
import { doubleOnclick } from "./ManageProduct";
import {
  Box,
  InputGroup,
  Input,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import CategoryForm from "../../components/admin/CategoryForm";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [icon, setIcon] = useState(false);
  const toast = useToast();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };

  useEffect(() => {
    fetchCategory().then((res) => setCategory(res));
  }, []);
  return (
    <Box Box pl="237px" bgColor={"var(--N50,#F3F4F5)"} fontSize="14px" h="100%">
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
            Daftar Kategori
          </Text>

          <Button
            bgColor={heroColor}
            color="white"
            _active={false}
            _hover={false}
            onClick={onOpen}
          >
            + Tambah Kategori
          </Button>
        </Box>

        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box pt="16px" minH={"584px"}>
            <Box pl="24px" pr="32px" pb="12px">
              <Box>
                <InputGroup>
                  <Input
                    placeholder="Cari kategori"
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
                    Nama Kategori
                  </Box>
                  <Box w="30%">Action</Box>
                </Box>
              </Box>

              {category.map((val) => {
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
                        {val?.category_name}
                      </Box>
                      <Box>
                        <Menu>
                          <MenuButton
                            as={Button}
                            onClick={iconHandler}
                            _hover={false}
                            _active={false}
                            rightIcon={
                              icon ? <ChevronUpIcon /> : <ChevronDownIcon />
                            }
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
        body={deleteAlert?.category_name}
        header="Hapus Kategori?"
        responsive="Hapus Kategori?"
        isOpen={deleteAlert}
        cancelRef={cancelRef}
        color={heroColor}
        leftButton="Batalkan"
        rightButton={"Hapus"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() =>
          doubleOnclick(
            deleteCategory(deleteAlert?.id).then((res) =>
              doubleOnclick(
                res.error
                  ? toast({
                      title: "Kategori gagal dihapus",
                      description: res,
                      status: "error",
                      variant: "top-accent",
                    })
                  : // console.log(res),
                    toast({
                      title: "Kategori dihapus",
                      description: res,
                      status: "success",
                      variant: "top-accent",
                    }),
                fetchCategory().then((res) => setCategory(res))
              )
            ),
            setDeleteAlert(null)
          )
        }
      />

      <CategoryForm
        isOpen={isOpen}
        onClose={onClose}
        header={"Kategori Baru"}
        input1={"Nama Kategori"}
        input1Name={"category_name"}
        input1Type={"text"}
        apiUrl="/category/add"
        fetch={() => setCategory()}
      />
    </Box>
  );
};

export default ManageCategory;
