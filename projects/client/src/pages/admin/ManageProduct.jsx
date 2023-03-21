import { Box, Button, Select, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import Alert from "../../components/reuseable/Alert";
import { heroColor } from "../../components/reuseable/Logo";
import { Link } from "react-router-dom";
import Pagination from "../../components/reuseable/Pagination";
import { useFormik } from "formik";
import Search from "../../components/reuseable/Search";
import RowProduct from "../../components/reuseable/admin/RowProduct";

export const doubleOnclick = (function1, function2) => {};

const ManageProduct = () => {
  const [product, setProduct] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("product_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [currentSearch, setCurrentSearch] = useState("");
  const toast = useToast();
  const [maxItemsPerPage] = useState(11);
  const [totalItems, setTotalItems] = useState(0);
  const cancelRef = React.useRef();

  const fetchProduct = async () => {
    const maxItemsPerPage = 4;
    try {
      const response = await axiosInstance.get("/product/get?", {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          product_name: currentSearch,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
      setMaxPage(Math.ceil((response.data.dataCount - 1) / maxItemsPerPage));
      setProduct(response.data.data);
      setTotalItems(response.data.dataCount);
      setIsLoading(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const sortHandler = ({ target }) => {
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

  const deleteHandler = async (id) => {
    try {
      console.log(id);
      const response = await axiosInstance.delete(`/product/delete/${id}`);

      toast({
        title: "Produk dihapus",
        status: "success",
        variant: "top-accent",
        description: response.data.message,
      });
      fetchProduct();
      setDeleteAlert(null);
    } catch (error) {
      console.log(error.response);
      toast({
        title: "Produk gagal dihapus",
        status: "error",
        variant: "top-accent",
        description: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page, sortDir, sortBy, currentSearch]);
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
            <Button
              bgColor={heroColor}
              color="white"
              _active={false}
              _hover={false}
            >
              + Tambah Produk
            </Button>
          </Link>
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
                placeholder="Search by product name"
                width={"100%"}
              />

              {/* Sort bar */}
              <Box>
                <Select onChange={sortHandler} fontSize="13px">
                  <option value="product_name ASC">Nama A-Z</option>
                  <option value="product_name DESC">Nama Z-A</option>
                  <option value="price DESC">Harga Tertinggi</option>
                  <option value="price ASC">Harga Terendah</option>
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
                  <Box pl="7px" pr="32px" w="45%">
                    INFO PRODUK
                  </Box>
                  <Box w="30%">HARGA</Box>
                  <Box w="25%">STOK</Box>
                  <Box w="16%">STATUS</Box>
                  <Box w="6%"> </Box>
                </Box>
              </Box>

              {isLoading &&
                product.map((val) => {
                  return (
                    <RowProduct
                      image_url={val.Image_Urls[0]?.image_url}
                      SKU={val.SKU}
                      deleteHandler={() => setDeleteAlert(val)}
                      id={val.id}
                      is_active={val.is_active}
                      price={val.price}
                      product_name={val.product_name}
                      stock={val.stock}
                    />
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>

      <Alert
        body={deleteAlert?.product_name}
        header="Hapus Produk?"
        responsive="Hapus Produk?"
        isOpen={deleteAlert}
        cancelRef={cancelRef}
        color={heroColor}
        leftButton="Batalkan"
        rightButton={"Hapus"}
        onClose={() => setDeleteAlert(null)}
        onSubmit={() => deleteHandler(deleteAlert?.id)}
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

export default ManageProduct;
