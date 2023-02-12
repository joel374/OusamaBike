import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Wajib from "../../components/reuseable/admin/Wajib";
import ImageBox from "../../components/reuseable/admin/ImageBox";
import { useFormik } from "formik";
import { axiosInstance } from "../../api/index";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../components/reuseable/fetch";

const NewProduct = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const categoryHandler = ({ target }) => {
    const { value } = target;
    setSelectedCategory(value);
  };

  const formik = useFormik({
    initialValues: {
      product_name: "",
      CategoryId: "",
      description: "",
      price: "",
      stock: "",
      sku: "",
    },
    onSubmit: async ({
      product_name,
      CategoryId,
      description,
      price,
      stock,
      sku,
    }) => {
      try {
        const productData = new FormData();

        if (product_name) {
          productData.append("product_name", product_name);
        }
        if (CategoryId) {
          productData.append("CategoryId", selectedCategory);
        }
        if (description) {
          productData.append("description", description);
        }
        if (price) {
          productData.append("price", price);
        }
        if (stock) {
          productData.append("stock", stock);
        }
        if (sku) {
          productData.append("sku", sku);
        }
        await axiosInstance.post("/product/add");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchCategory().then((res) => setCategory(res));
  }, []);
  return (
    <Box m="85px auto" w="1200px">
      <Box m="16px" fontWeight={"bold"} fontSize="20px">
        <Text m="20px 0">Tambah Produk</Text>
      </Box>
      <Box mb="14px"></Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          m="16px"
          p="32px"
          fontWeight={"bold"}
          boxShadow={"0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))"}
          borderRadius="8px"
        >
          <Box display={"flex"}>
            <Box w="272px">
              <Box display={"flex"}>
                <Text mb="8px" lineHeight={"20px"} position={"relative"}>
                  Foto Produk
                </Text>
                <Wajib />
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
                  (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).
                  <br />
                  <br />
                  Pilih foto produk atau tarik dan letakkan hingga 5 foto
                  sekaligus di sini. Cantumkan min. 3 foto yang menarik agar
                  produk semakin menarik pembeli.
                </Text>
              </Box>
            </Box>
            <Box>
              <Box ml="70px" display={"flex"}>
                <ImageBox desc={"Foto Utama"} formik={formik} />
                <ImageBox desc={"Foto 2"} formik={formik} />
                <ImageBox desc={"Foto 3"} formik={formik} />
                <ImageBox desc={"Foto 4"} formik={formik} />
                <ImageBox desc={"Foto 5"} formik={formik} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          m="16px"
          p="0 32px"
          pt="11px"
          fontWeight={"bold"}
          boxShadow={"0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))"}
          borderRadius="8px"
        >
          <Text m="22px 0px 48px">Informasi Produk</Text>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Nama Produk</Text>
                <Wajib />
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Nama produk min. 40 karakter dengan memasukkan merek, jenis
                  produk, warna, bahan, atau tipe.
                </Text>
              </Box>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={formik.errors.product_name}>
                <Input
                  value={formik.values.product_name}
                  name="product_name"
                  type={"text"}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formik.errors.product_name}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Kategori</Text>
                <Wajib />
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Pilih kategori yang sesuai
                </Text>
              </Box>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={formik.errors.CategoryId}>
                <Select placeholder="Pilih Kategori" onChange={categoryHandler}>
                  {category.map((val) => (
                    <option value={val.id}>{val.category_name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{formik.errors.CategoryId}</FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          m="16px"
          p="0 32px"
          pt="11px"
          fontWeight={"bold"}
          boxShadow={"0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))"}
          borderRadius="8px"
        >
          <Text m="22px 0px 48px">Detail Produk</Text>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Deskripsi Produk</Text>
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Pastikan deskripsi produk memuat penjelasan detail terkait
                  produkmu agar pembeli mudah mengerti dan menemukan produkmu.
                  <br />
                  <br />
                  Disarankan untuk <b>tidak memasukkan</b> info nomor HP,
                  e-mail, dsb. ke dalam deskripsi produk untuk melindungi data
                  pribadimu.
                </Text>
              </Box>
            </Box>
            <Box w="605px">
              <FormControl isInvalid={formik.errors.description}>
                <Textarea
                  h="208px"
                  overflowY="scroll"
                  p="4px"
                  borderRadius={"8px"}
                  resize={"none"}
                  _placeholder={{ fontSize: "12px" }}
                  placeholder="Masukkan Deskripsi"
                  value={formik.values.description}
                  name="description"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          m="16px"
          p="0 32px"
          pt="11px"
          fontWeight={"bold"}
          boxShadow={"0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))"}
          borderRadius="8px"
        >
          <Text m="22px 0px 48px">Harga</Text>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Harga</Text>
                <Wajib />
              </Box>
            </Box>
            <Box w="605px">
              <FormControl isInvalid={formik.errors.price}>
                <Input
                  name="price"
                  value={formik.values.price}
                  onChange={formChangeHandler}
                  type="number"
                />
                <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          m="16px"
          p="0 32px"
          pt="11px"
          fontWeight={"bold"}
          boxShadow={"0 1px 6px 0 var(--color-shadow,rgba(49,53,59,0.12))"}
          borderRadius="8px"
        >
          <Text m="22px 0px 48px">Pengelolaan Produk</Text>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Status Produk</Text>
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Jika status aktif, produkmu dapat dicari oleh calon pembeli.
                </Text>
              </Box>
            </Box>
            <Box w="605px">
              <Switch size={"md"} />
            </Box>
          </Box>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Stok Produk</Text>
                <Wajib />
              </Box>
            </Box>
            <Box w="605px">
              <Input placeholder="Masukkan Jumlah Stok" />
            </Box>
          </Box>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>SKU (Stock Keeping Unit)</Text>
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Gunakan kode unik SKU jika kamu ingin menandai produkmu.
                </Text>
              </Box>
            </Box>
            <Box w="605px">
              <Input placeholder="Masukkan SKU" />
            </Box>
          </Box>
        </Box>

        <Box
          display={"flex"}
          justifyContent="flex-end"
          m="8px 16px 0px 0px"
          pb="16px"
        >
          <Button h="38px" w="156px" mr="12px" fontSize={"12px"}>
            Batal
          </Button>
          <Button h="38px" w="156px" fontSize={"12px"} type="submit">
            Simpan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewProduct;
