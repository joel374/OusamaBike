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
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
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
      <Box justifyContent={"center"} display="flex">
        <Logo />
      </Box>
      <Box m="14% 0">
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
                Masuk
              </Text>

              <form onSubmit={formik.handleSubmit}>
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
                <FormControl m="15px 0" isInvalid={formik.errors.password}>
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
                  Belum punya akun?{" "}
                  <Link to="/register">
                    <Text display={"inline"} color={heroColor}>
                      Daftar
                    </Text>
                  </Link>
                </Box>

                <Box textAlign={"center"} mt="2">
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
