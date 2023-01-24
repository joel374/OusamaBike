import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });

        toast({
          title: "Login Sukses",
          status: "success",
          description: response.data.message,
        });

        dispatch(
          login({
            id: response.data.data.id,
            username: response.data.data.username,
            email: response.data.data.email,
            is_verify: response.data.data.is_verify,
          })
        );

        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");

        navigate("/");
      } catch (error) {
        console.warn(error);
        toast({
          title: "Login Gagal",
          status: "error",
          description: error.response.data.message,
        });
      }
    },
    // validateOnChange: false,
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
      <Box m="14% 0">
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderRadius="8px"
          w="500px"
          h="auto"
          mx="auto"
          mb="30px"
        >
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
                    placeholder="Password"
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
                      <Box>{showPassword ? <VscEye /> : <VscEyeClosed />}</Box>
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Box fontSize={"12px"} textAlign="right">
                Belum punya akun? <Link to="/register">Daftar</Link>
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
                  Masuk
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
