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
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Logo, { heroColor } from "../components/reuseable/Logo";
import ButtonMod from "../components/reuseable/ButtonMod";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        setIsLoading(false);
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });

        toast({
          title: "Login Sukses",
          status: "success",
          variant: "top-accent",
          description: response.data.message,
        });
        localStorage.setItem("auth_token", response.data.token);

        dispatch(
          login({
            id: response.data.data.id,
            username: response.data.data.username,
            email: response.data.data.email,
            is_verify: response.data.data.is_verify,
            is_admin: response.data.data.is_admin,
          })
        );

        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");

        setIsLoading(true);

        navigate("/");
      } catch (error) {
        console.log(error);
        toast({
          title: "Login Gagal",
          status: "warning",
          variant: "top-accent",
          description: error.response.data.message,
        });

        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");

        setIsLoading(true);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email tidak boleh kosong")
        .email("Email tidak boleh kosong"),
      password: Yup.string().required("Kata Sandi tidak boleh kosong"),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };
  return (
    <Box>
      <Box
        justifyContent={"center"}
        display={{ lg: "flex", md: "none", base: "none" }}
      >
        <Logo />
      </Box>
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
              <Box
                display={{ lg: "block", md: "flex", base: "flex" }}
                h="52px"
                alignItems={"center"}
              >
                <Box
                  display={{ lg: "none", md: "block", base: "block" }}
                  fontSize="24px"
                  p="1px 6px"
                  w="52px"
                  onClick={() => navigate("/")}
                >
                  <Box m="0 10px">
                    <BiArrowBack />
                  </Box>
                </Box>
                <Box w={{ lg: "auto", md: "90%", base: "90%" }}>
                  <Text
                    fontSize={{ lg: "32px", md: "16px", base: "16px" }}
                    fontWeight="semibold"
                  >
                    Masuk
                  </Text>
                </Box>
                <Link to="/register">
                  <Box
                    fontSize={"14px"}
                    textAlign="right"
                    display={{ lg: "none", md: "block", base: "block" }}
                    mr="16px"
                  >
                    <Text display={"inline"} color={heroColor}>
                      Daftar
                    </Text>
                  </Box>
                </Link>
              </Box>

              <Box p={{ lg: "0", md: "8px 16px 32px", base: "8px 16px 32px" }}>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl
                    m={{ lg: "20px 0", md: "0", base: "0" }}
                    isInvalid={formik.errors.email}
                  >
                    <FormLabel
                      fontSize={"12px"}
                      color="var(--color-text-low,rgba(49,53,59,0.68))"
                      display={{ lg: "none", md: "block", base: "block" }}
                      m="0"
                    >
                      Email
                    </FormLabel>
                    <Input
                      name="email"
                      type={"email"}
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
                      value={formik.values.email}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl m="15px 0" isInvalid={formik.errors.password}>
                    <FormLabel
                      fontSize={"12px"}
                      color="var(--color-text-low,rgba(49,53,59,0.68))"
                      display={{ lg: "none", md: "block", base: "block" }}
                      m="0"
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
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
                        name="password"
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
                    Belum punya akun?{" "}
                    <Link to="/register">
                      <Text display={"inline"} color={heroColor}>
                        Daftar
                      </Text>
                    </Link>
                  </Box>

                  <Box textAlign={"center"} mt="16px">
                    <ButtonMod
                      isDisabled={
                        formik.values.email.includes("@") &&
                        formik.values.email.includes(".co")
                          ? false
                          : true
                      }
                      text={"Masuk"}
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

export default Login;
