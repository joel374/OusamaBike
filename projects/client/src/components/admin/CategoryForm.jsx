import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { heroColor } from "../reuseable/Logo";
import { useFormik } from "formik";
import { axiosInstance } from "../../api";
import React, { useState } from "react";
import Alert from "../reuseable/Alert";
import { doubleOnclick } from "../../pages/admin/ManageProduct";
import * as Yup from "yup";

const CategoryForm = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef();
  const [alert, setAlert] = useState(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    onSubmit: async ({ category_name }) => {
      try {
        const response = await axiosInstance.post("/category/add", {
          category_name,
        });

        toast({
          title: "Kategori berhasil ditambahkan",
          status: "success",
          variant: "top-accent",
          description: response.data.message,
        });

        formik.setFieldValue("category_name", "");
      } catch (error) {
        console.log(error);
        toast({
          title: "Kategori gagal ditambahkan",
          status: "error",
          variant: "top-accent",
          description: error.response.data.message,
        });
      }
    },
    validationSchema: Yup.object({
      category_name: Yup.string()
        .required("Nama kategori harus diisi")
        .min(3, "Nama kategori tidak boleh kurang dari 3 huruf"),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
          <ModalHeader
            fontSize={"24px"}
            fontWeight="bold"
            textAlign={"center"}
            borderBottom="1px solid #dfe1e3"
            p="0"
            h="36px"
          >
            <Text m="24px 0 16px">Kategori Baru</Text>
          </ModalHeader>
          <ModalCloseButton _hover={false} _active={false} mt="10px" />

          <ModalBody p="24px 40px" fontSize={"14px"}>
            <Box mt="12px">
              <FormLabel mb="8px">Nama Kategori</FormLabel>
              <FormControl isInvalid={formik.errors.category_name}>
                <Input
                  value={formik.values.category_name}
                  name={`category_name`}
                  type={"text"}
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formik.errors.category_name}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box m="20px 0px" textAlign={"center"}>
              <Button
                p="0px 16px"
                fontSize={"16px"}
                color="white"
                fontWeight={"bold"}
                w="80px"
                _hover={false}
                bgColor={heroColor}
                onClick={() =>
                  formik.errors.category_name
                    ? formik.errors.category_name
                    : setAlert(formik.values?.category_name)
                }
                disabled={!formik.values.category_name}
              >
                Simpan
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </form>

      <Alert
        body={alert}
        header="Tambah Kategori?"
        responsive="Tambah Kategori?"
        isOpen={alert}
        cancelRef={cancelRef}
        color={heroColor}
        leftButton="Batalkan"
        rightButton={"Tambah"}
        onClose={onClose}
        onSubmit={() =>
          doubleOnclick(
            formik.handleSubmit(),
            doubleOnclick(setAlert(null), onClose())
          )
        }
      />
    </Modal>
  );
};

export default CategoryForm;
