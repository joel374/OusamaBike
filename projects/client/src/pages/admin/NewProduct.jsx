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
  useToast,
} from "@chakra-ui/react";
import Wajib from "../../components/reuseable/admin/Wajib";
import ImageBox from "../../components/reuseable/admin/ImageBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../api/index";
import { useEffect, useState } from "react";
import {
  fetchBrandCategory,
  fetchCategory,
} from "../../components/reuseable/fetch";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [active, setActive] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const activeHandler = () => {
    active ? setActive(0) : setActive(1);
  };

  const formik = useFormik({
    initialValues: {
      product_name: "",
      CategoryId: "",
      BrandCategoryId: "",
      description: "",
      price: "",
      stock: "",
      image_url1: "",
      image_url2: "",
      // image_url3: "",
      SKU: "",
      is_active: "",
    },
    onSubmit: async ({
      product_name,
      CategoryId,
      BrandCategoryId,
      description,
      price,
      stock,
      SKU,
      is_active,
      image_url1,
      image_url2,
    }) => {
      try {
        const productData = new FormData();

        productData.append("product_name", product_name);
        productData.append("CategoryId", CategoryId);
        productData.append("BrandCategoryId", BrandCategoryId);
        if (description) {
          productData.append("description", description);
        }
        productData.append("price", price);
        productData.append("stock", stock);
        if (SKU) {
          productData.append("SKU", SKU);
        }
        productData.append("is_active", active);
        productData.append("image_url1", image_url1);
        productData.append("image_url2", image_url2);
        console.log(image_url1);
        const response = await axiosInstance.post("/product/add", productData);

        formik.setFieldValue("product_name", "");
        formik.setFieldValue("description", "");
        formik.setFieldValue("price", "");
        formik.setFieldValue("CategoryId", "");
        formik.setFieldValue("BrandCategoryId", "");
        formik.setFieldValue("price", "");
        formik.setFieldValue("stock", "");
        formik.setFieldValue("SKU", "");
        formik.setFieldValue("image_url1", "");
        formik.setFieldValue("image_url2", "");

        toast({
          title: "Produk ditambahkan",
          status: "success",
          description: response.data.message,
          variant: "top-accent",
        });

        navigate("/admin/manage-product");
      } catch (error) {
        console.log(error);
        toast({
          title: "Produk gagal ditambahkan",
          status: "warning",
          description: error.response.data.message,
          variant: "top-accent",
        });
      }
    },
    // validationSchema: Yup.object({
    //   product_name: Yup.string()
    //     .required("Nama produk harus diisi")
    //     .min(15, "Tidak boleh kurang dari 15 huruf"),
    //   description: Yup.string(),
    //   price: Yup.number()
    //     .required("Harga harus diisi")
    //     .min(1000, "Harga tidak boleh kurang dari Rp1.000"),
    //   stock: Yup.number()
    //     .required("Stok harus diisi")
    //     .min(1, "Stok tidak boleh kurang dari 1"),
    //   image_url1: Yup.string().required("Silahkan pilih Foto Produk"),
    //   image_url2: Yup.string().required("Silahkan pilih Foto Produk"),
    //   CategoryId: Yup.string().required("Silahkan pilih Kategori"),
    //   BrandCategoryId: Yup.string().required("Silahkan pilih Merek"),
    //   SKU: Yup.number(),
    // }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchCategory().then((res) => setCategory(res));
    fetchBrandCategory().then((res) => setBrand(res));
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
              <FormControl isInvalid={formik.errors.image_url}>
                <Box ml="70px" display={"flex"}>
                  <ImageBox
                    desc={"Foto Utama"}
                    name={"image_url1"}
                    formik={formik}
                  />
                  <ImageBox
                    desc={"Foto 2"}
                    name={"image_url2"}
                    formik={formik}
                  />
                  <ImageBox
                    desc={"Foto 3"}
                    name={"image_url3"}
                    formik={formik}
                  />
                  <ImageBox
                    desc={"Foto 4"}
                    name={"image_url4"}
                    formik={formik}
                  />
                  <ImageBox
                    desc={"Foto 5"}
                    name={"image_url5"}
                    formik={formik}
                  />
                </Box>
                <FormErrorMessage ml="70px" mt="-20px">
                  {formik.errors.image_url}
                </FormErrorMessage>
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
                <Select
                  placeholder="Pilih Kategori"
                  onChange={formChangeHandler}
                  name={"CategoryId"}
                >
                  {category.map((val) => (
                    <option value={val.id}>{val.category_name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{formik.errors.CategoryId}</FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
          <Box display={"flex"} fontSize={"14px"} pb="40px">
            <Box display={"flex"} flexDirection="column" s w="350px" pr="100px">
              <Box display={"flex"} pb="8px">
                <Text>Merek</Text>
                <Wajib />
              </Box>
              <Box>
                <Text
                  color={"var(--N700,#31353B)AD"}
                  fontSize="12px"
                  fontWeight={"normal"}
                  whiteSpace="pre-line"
                >
                  Pilih merek yang sesuai
                </Text>
              </Box>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={formik.errors.BrandCategoryId}>
                <Select
                  placeholder="Pilih Merek"
                  name="BrandCategoryId"
                  onChange={formChangeHandler}
                >
                  {brand?.map((val) => (
                    <option value={val.id}>{val.brand_name}</option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {formik.errors.BrandCategoryId}
                </FormErrorMessage>
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
                  p="4px 16px"
                  borderRadius={"8px"}
                  resize={"none"}
                  _placeholder={{ fontSize: "14px" }}
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
                  onWheel={(e) => e.target.blur()}
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
              <Switch
                size={"md"}
                name="is_active"
                onChange={activeHandler}
                value={formik.values.is_active}
              />
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
              <FormControl isInvalid={formik.errors.stock}>
                <Input
                  placeholder="Masukkan Jumlah Stok"
                  value={formik.values.stock}
                  name="stock"
                  onChange={formChangeHandler}
                  type="number"
                />
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
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
              <Input
                placeholder="Masukkan SKU"
                value={formik.values.SKU}
                onChange={formChangeHandler}
                type="number"
                name="SKU"
              />
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
          <Button
            h="38px"
            w="156px"
            fontSize={"12px"}
            isDisabled={
              !formik.values.CategoryId ||
              !formik.values.BrandCategoryId ||
              !formik.values.price ||
              !formik.values.product_name ||
              !formik.values.stock
              // ||
              // !formik.values.image_url
            }
            type="submit"
          >
            Simpan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewProduct;
