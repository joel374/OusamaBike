import React, { useEffect, useState } from "react";
import Alert from "../../components/reuseable/Alert";
import { heroColor } from "../../components/reuseable/Logo";
import {
  Box,
  Button,
  Text,
  useToast,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import CategoryForm from "../../components/admin/CategoryForm";
import { axiosInstance } from "../../api";
import Pagination from "../../components/reuseable/Pagination";
import { useFormik } from "formik";
import Search from "../../components/reuseable/Search";
import RowCategoryAndBrand from "../../components/reuseable/admin/RowCategoryAndBrand";
import EditCategoryForm from "../../components/admin/EditCategoryForm";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("category_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [currentSearch, setCurrentSearch] = useState("");
  const [maxItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const toast = useToast();
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchCategory = async () => {
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
      setTotalItems(response.data.dataCount);
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

  const deleteBtnHandler = async (id) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      toast({
        title: "Kategori dihapus",
        description: response.data.message,
        status: "success",
        variant: "top-accent",
      });
      setDeleteAlert(null);
      fetchCategory();
    } catch (error) {
      console.log(error);
      toast({
        title: "Kategori gagal dihapus",
        description: error.response.da.message,
        status: "error",
        variant: "top-accent",
      });
    }
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
                    <RowCategoryAndBrand
                      brand_name={val.category_name}
                      createdAt={val.createdAt}
                      deleteHandler={() => setDeleteAlert(val)}
                      editHandler={() => setEditForm(val)}
                      id={val.id}
                      key={val.id.toString()}
                    />
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
        onSubmit={() => deleteBtnHandler(deleteAlert?.id)}
      />

      <CategoryForm isOpen={isOpen} onClose={onClose} />
      <EditCategoryForm
        isOpen={editForm}
        onClose={() => setEditForm(null)}
        fieldValue={editForm}
        render={() => fetchCategory()}
      />

      <Pagination
        maxPage={maxPage}
        nextPage={nextPage}
        page={page}
        maxItemsPerPage={maxItemsPerPage}
        totalItem={totalItems}
        setPage={(numbers) => setPage(numbers)}
        previousPage={previousPage}
      />
    </Box>
  );
};

export default ManageCategory;
