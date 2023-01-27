import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { axiosInstance } from "../api";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ username, email, password }) => {
      try {
        setIsLoading(false);
        const response = await axiosInstance.post("/auth/register", {
          username,
          email,
          password,
        });

        toast({
          title: "Daftar Sukses",
          status: "success",
          description: response.data.message,
        });

        formik.setFieldValue("username", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");

        setIsLoading(true);
      } catch (error) {
        console.log(error);
        toast({
          title: "Daftar Gagal",
          status: "warning",
          description: error.response.data.message,
        });

        formik.setFieldValue("username", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");

        setIsLoading(true);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Nama Pengguna tidak boleh kosong")
        .min(3, "Nama Pengguna tidak boleh kurang dari 3 huruf"),
      email: Yup.string()
        .required("Email tidak boleh kosong")
        .email("Email tidak boleh kosong"),
      password: Yup.string()
        .required("Kata Sandi tidak boleh kosong")
        .min(8)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Kata Sandi harus berisi 8 karakter, 1 huruf besar, 1 huruf kecil dan 1 angka"
        ),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };
  return (
    <Box>
      <Text textAlign={"center"} fontSize="20px">
        OusamaBike
      </Text>
      <Box m="12% 0">
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderRadius="8px"
          w="500px"
          h="auto"
          mx="auto"
          mb="30px"
        >
          {isLoading === false ? (
            <Box p="20px">
              <Skeleton
                height={"48px"}
                startColor="#bab8b8"
                endColor="#d4d2d2"
                w="140px"
                borderRadius="8px"
              />
              <Skeleton
                m={"20px 0"}
                height={"40px"}
                startColor="#bab8b8"
                endColor="#d4d2d2"
                borderRadius="8px"
              />
              <Skeleton
                m={"20px 0"}
                height={"40px"}
                startColor="#bab8b8"
                endColor="#d4d2d2"
                borderRadius="8px"
              />
              <Skeleton
                m={"20px 0"}
                height={"40px"}
                startColor="#bab8b8"
                endColor="#d4d2d2"
                borderRadius="8px"
              />
              <Box display={"flex"} justifyContent="right">
                <Skeleton
                  height={"18px"}
                  startColor="#bab8b8"
                  endColor="#d4d2d2"
                  borderRadius="8px"
                  w="160px"
                />
              </Box>
              <Box mt="2" display={"flex"} justifyContent="center">
                <Skeleton
                  height={"40px"}
                  startColor="#bab8b8"
                  endColor="#d4d2d2"
                  borderRadius="8px"
                  w="80px"
                />
              </Box>
            </Box>
          ) : (
            <Box p="20px">
              <Text fontSize={"32px"} fontWeight="semibold">
                Daftar
              </Text>

              <form onSubmit={formik.handleSubmit}>
                <FormControl m="20px 0" isInvalid={formik.errors.username}>
                  <Input
                    name="username"
                    type={"text"}
                    placeholder="Nama Pengguna"
                    onChange={formChangeHandler}
                    value={formik.values.username}
                  />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl m="20px 0" isInvalid={formik.errors.email}>
                  <Input
                    name="email"
                    type={"email"}
                    placeholder="Email"
                    onChange={formChangeHandler}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl m="20px 0" isInvalid={formik.errors.password}>
                  <InputGroup>
                    <Input
                      name="password"
                      placeholder="Kata Sandi"
                      onChange={formChangeHandler}
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                    />
                    <InputRightElement>
                      <Button
                        bgColor={"transparent"}
                        _hover={false}
                        _active={false}
                        onClick={togglePassword}
                        fontSize={"20px"}
                      >
                        <Box>
                          {showPassword ? <VscEye /> : <VscEyeClosed />}
                        </Box>
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <Box fontSize={"12px"} textAlign="right">
                  Sudah punya akun? <Link to="/login">Masuk</Link>
                </Box>

                <Box textAlign={"center"} mt="2">
                  <Button
                    isDisabled={
                      formik.values.email.includes("@") &&
                      formik.values.email.includes(".co")
                        ? false
                        : true
                    }
                    type="submit"
                  >
                    Daftar
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
