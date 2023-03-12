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
import BrandForm from "../../components/admin/BrandForm";
import { axiosInstance } from "../../api";
import Pagination from "../../components/reuseable/Pagination";
import { useFormik } from "formik";
import Search from "../../components/reuseable/Search";
import RowCategoryAndBrand from "../../components/reuseable/admin/RowCategoryAndBrand";

const ManageBrand = () => {
  const [brand, setBrand] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("brand_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [currentSearch, setCurrentSearch] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchBrandCategory = async () => {
    const maxItemsPerPage = 11;
    try {
      const response = await axiosInstance.get("/category/getBrand", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          brand_name: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));
      setBrand(response.data.data);
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
      const response = await axiosInstance.delete(
        `/category/deleteBrand/${id}`
      );
      toast({
        title: "Kategori dihapus",
        description: response.data.message,
        status: "success",
        variant: "top-accent",
      });
      setDeleteAlert(null);
      fetchBrandCategory();
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
    fetchBrandCategory();
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
            Daftar Merek
          </Text>

          <Button
            bgColor={heroColor}
            color="white"
            _active={false}
            _hover={false}
            onClick={onOpen}
          >
            + Tambah Merek
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
                  <option value="brand_name ASC">Nama A-Z</option>
                  <option value="brand_name DESC">Nama Z-A</option>
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
                    Nama Merek
                  </Box>
                  <Box w="33%">Tanggal dibuat</Box>
                  <Box w="33%">Action</Box>
                </Box>
              </Box>
              {isLoading &&
                brand?.map((val) => {
                  return (
                    <RowCategoryAndBrand
                      brand_name={val.brand_name}
                      createdAt={val.createdAt}
                      deleteHandler={() => setDeleteAlert(val)}
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
        body={deleteAlert?.brand_name}
        header="Hapus Kategori?"
        responsive="Hapus Kategori?"
        isOpen={deleteAlert}
        color={heroColor}
        leftButton="Batalkan"
        rightButton={"Hapus"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() => deleteBtnHandler(deleteAlert?.id)}
      />

      <BrandForm isOpen={isOpen} onClose={onClose} />

      <Pagination
        maxPage={maxPage}
        nextPage={nextPage}
        page={page}
        previousPage={previousPage}
      />
    </Box>
  );
};

export default ManageBrand;
