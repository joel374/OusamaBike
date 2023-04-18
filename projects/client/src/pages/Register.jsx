import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import Logo, { heroColor } from "../components/reuseable/Logo";
import ButtonMod from "../components/reuseable/ButtonMod";
import { BiArrowBack } from "react-icons/bi";

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
          variant: "top-accent",
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
          variant: "top-accent",
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
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h="100vh"
    >
      <Box m={{ lg: "14% 0", md: "0", base: "0" }}>
        <Box
          boxShadow={{
            lg: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            md: "none",
            base: "none",
          }}
          borderRadius={{ lg: "8px", md: "none", base: "none" }}
          w={{ lg: "500px", base: "auto", md: "auto" }}
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
            <Box p={{ lg: "20px", md: "none", base: "none" }}>
              <Box alignItems={"center"}>
                <Box justifyContent={"center"} display={"flex"}>
                  <Logo />
                </Box>
                <Text fontSize={"x-large"} fontWeight="medium">
                  Daftar
                </Text>
              </Box>

              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl m={"20px 0"} isInvalid={formik.errors.username}>
                    <FormLabel
                      fontSize={"14px"}
                      color="var(--color-text-low,rgba(49,53,59,0.68))"
                      m="0"
                    >
                      Nama Pengguna
                    </FormLabel>
                    <Input
                      name="username"
                      h={{ lg: "40px", md: "26px", base: "26px" }}
                      p={{ lg: "0 16px", md: "3px 0", base: "3px 0" }}
                      borderRadius={"var(--chakra-radii-md)"}
                      border={{
                        lg: "1px solid var(--chakra-colors-gray-200)",
                        md: "0",
                        base: "0",
                      }}
                      outline="0px"
                      borderBottom={"1px solid" + `${heroColor}`}
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.username}
                    />
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl m={"15px 0"} isInvalid={formik.errors.email}>
                    <FormLabel
                      fontSize={"14px"}
                      color="var(--color-text-low,rgba(49,53,59,0.68))"
                      m="0"
                    >
                      Email
                    </FormLabel>
                    <Input
                      name="email"
                      h={{ lg: "40px", md: "26px", base: "26px" }}
                      p={{ lg: "0 16px", md: "3px 0", base: "3px 0" }}
                      borderRadius={{
                        lg: "var(--chakra-radii-md)",
                        md: "0",
                        base: "0",
                      }}
                      border={{
                        lg: "1px solid var(--chakra-colors-gray-200)",
                        md: "0",
                        base: "0",
                      }}
                      outline="0px"
                      borderBottom={"1px solid" + `${heroColor}`}
                      type={"email"}
                      onChange={formChangeHandler}
                      value={formik.values.email}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl m={"15px 0"} isInvalid={formik.errors.password}>
                    <FormLabel
                      fontSize={"14px"}
                      color="var(--color-text-low,rgba(49,53,59,0.68))"
                      m="0"
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        h={{ lg: "40px", md: "26px", base: "26px" }}
                        p={{ lg: "0 16px", md: "3px 0", base: "3px 0" }}
                        borderRadius={{
                          lg: "var(--chakra-radii-md)",
                          md: "0",
                          base: "0",
                        }}
                        border={{
                          lg: "1px solid var(--chakra-colors-gray-200)",
                          md: "0",
                          base: "0",
                        }}
                        outline="0px"
                        borderBottom={"1px solid" + `${heroColor}`}
                        onChange={formChangeHandler}
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                      />
                      <InputRightElement
                        h={{ lg: "40px", md: "26px", base: "26px" }}
                      >
                        <Button
                          bgColor={"transparent"}
                          color={heroColor}
                          _hover={false}
                          _active={false}
                          onClick={togglePassword}
                          fontSize={{ lg: "20px", md: "16px", base: "16px" }}
                        >
                          <Box>
                            {showPassword ? <VscEye /> : <VscEyeClosed />}
                          </Box>
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  <Box fontSize={"12px"} textAlign="right">
                    Sudah punya akun?{" "}
                    <Link to="/login">
                      <Text display={"inline"} color={heroColor}>
                        Masuk
                      </Text>
                    </Link>
                  </Box>

                  <Box textAlign={"center"} mt="16px">
                    <ButtonMod
                      isDisabled={
                        !formik.values.email.includes("@") ||
                        !formik.values.email.includes(".co") ||
                        formik.values.username.length < 3 ||
                        formik.values.password.length < 8
                          ? true
                          : false
                      }
                      text={"Daftar"}
                    />
                  </Box>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
