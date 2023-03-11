import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import Alert from "../../components/reuseable/Alert";
import { deleteCategory } from "../../components/reuseable/fetch";
import { heroColor } from "../../components/reuseable/Logo";
import { doubleOnclick } from "./ManageProduct";
import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import CategoryForm from "../../components/admin/CategoryForm";
import { axiosInstance } from "../../api";
import Pagination from "../../components/reuseable/Pagination";
import moment from "moment";
import { useFormik } from "formik";
import Search from "../../components/reuseable/Search";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [icon, setIcon] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("category_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [currentSearch, setCurrentSearch] = useState("");
  const toast = useToast();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconHandler = () => {
    icon ? setIcon(false) : setIcon(true);
  };

  const fetchCategory = async () => {
    const maxItemsPerPage = 11;
    try {
      const response = await axiosInstance.get("/category/get", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          category_name: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));
      setCategory(response.data.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const sortCategoryHandler = ({ target }) => {
    const { value } = target;
    setSortBy(value.split(" ")[0]);
    setSortDir(value.split(" ")[1]);
    setIsLoading(false);
  };

  const nextPage = () => {
    setPage(page + 1);
    setIsLoading(false);
  };

  const previousPage = () => {
    setPage(page - 1);
    setIsLoading(false);
  };

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search);
      setPage(1);
      setIsLoading(false);
    },
  });

  const searchHandler = ({ target }) => {
    const { name, value } = target;
    formikSearch.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchCategory();
  }, [page, sortDir, sortBy, currentSearch]);
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
            <Box
              pl="24px"
              pr="32px"
              pb="12px"
              display={"flex"}
              justifyContent="space-between"
            >
              {/* Search bar */}
              <Search
                formikSearch={formikSearch}
                searchHandler={searchHandler}
                placeholder="Search by category name"
                width={"100%"}
              />

              {/* Sort bar */}
              <Box>
                <Select onChange={sortCategoryHandler} fontSize="13px">
                  <option value="category_name ASC">Nama A-Z</option>
                  <option value="category_name DESC">Nama Z-A</option>
                  <option value="createdAt DESC">Paling Baru</option>
                  <option value="createdAt ASC">Paling Lama</option>
                </Select>
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
                  <Box pl="7px" pr="32px" w="33%">
                    Nama Kategori
                  </Box>
                  <Box w="33%">Tanggal dibuat</Box>
                  <Box w="33%">Action</Box>
                </Box>
              </Box>

              {isLoading &&
                category?.map((val) => {
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
                        <Box pl="7px" pr="32px" w="33%">
                          {val?.category_name}
                        </Box>
                        <Box w="33%">
                          {moment(val?.createdAt).format("LLLL")}
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
                  : toast({
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

      <CategoryForm isOpen={isOpen} onClose={onClose} />

      <Pagination
        maxPage={maxPage}
        nextPage={nextPage}
        page={page}
        previousPage={previousPage}
      />
    </Box>
  );
};

export default ManageCategory;
