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
  Image,
  Divider,
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
import Bar from "../components/Bar";
import banner from '../assets/banner.png'
import { RiEyeFill } from "react-icons/ri";

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
    <Box
      // display={"flex"}
      // alignItems={"center"}
      // justifyContent={"center"}
      position="relative"
    >
      <Bar />
      {/* <Box
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        borderRadius={"8px"}
        w={"500px"}
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
            <Box alignItems={"center"}>
              <Box justifyContent={"center"} display={"flex"}>
                <Logo />
              </Box>
              <Text fontSize={"x-large"} fontWeight="medium">
                Masuk
              </Text>
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <FormControl m={"20px 0"} isInvalid={formik.errors.email}>
                  <FormLabel
                    fontSize={"14px"}
                    color="var(--color-text-low,rgba(49,53,59,0.68))"
                    m="0"
                  >
                    Email
                  </FormLabel>
                  <Input
                    name="email"
                    type={"email"}
                    h={"40px"}
                    p={"0 16px"}
                    placeholder="Email"
                    onChange={formChangeHandler}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl m="15px 0" isInvalid={formik.errors.password}>
                  <FormLabel
                    fontSize={"14px"}
                    color="var(--color-text-low,rgba(49,53,59,0.68))"
                    m="0"
                  >
                    Kata Sandi
                  </FormLabel>
                  <InputGroup>
                    <Input
                      h={"40px"}
                      p={"0 16px"}
                      name="password"
                      placeholder="Kata sandi"
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

                <Box textAlign={"center"} mt="16px">
                  <ButtonMod
                    isDisabled={
                      !formik.values.email.includes("@") ||
                        !formik.values.email.includes(".co") ||
                        formik.values.password.length < 8
                        ? true
                        : false
                    }
                    text={"Masuk"}
                  />
                </Box>
              </form>
            </Box>
          </Box>
        )}
      </Box> */}

      <Image src={banner} w='100%' mt='125px' />
      <Box
        position="absolute"
        top="10%"
        left="60%"
        // transform="translate(-50%, -50%)"
        backgroundColor="white"
        w='400px'
      >
        <Text fontSize={'20px'} fontWeight={'600'} p='22px 30px'>
          Log in
        </Text>
        <Box p='0 30px 30px'>
          <form onSubmit={formik.handleSubmit}>

            <Box mt='30px'>
              <FormControl m={"20px 0"} isInvalid={formik.errors.email}>
                <Input
                  placeholder="Email"
                  name="email"
                  type={"email"}
                  borderRadius={'2px'}
                  _placeholder={{ fontSize: '14px', color: 'var(--Grayscale-Gray, #BDBDBD)' }}
                  padding='12px'
                  onChange={formChangeHandler}
                  value={formik.values.email}
                />
              </FormControl>
            </Box>
            <Box mt='30px'>
              <FormControl isInvalid={formik.errors.password}>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    borderRadius={'2px'}
                    _placeholder={{ fontSize: '14px', color: 'var(--Grayscale-Gray, #BDBDBD)' }}
                    padding='12px'
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
                      _hover={false}
                      _active={false}
                      onClick={togglePassword}
                      fontSize={{ lg: "20px", md: "16px", base: "16px" }}
                    >
                      <Box>
                        {showPassword ? <RiEyeFill /> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 43 42" fill="none">
                          <path d="M16.4975 32.8685L13.1179 31.962L14.4946 26.8188C12.4339 26.0584 10.5186 24.9503 8.83206 23.5428L5.0658 27.3123L2.59229 24.8378L6.35854 21.0683C4.23152 18.5198 2.80236 15.4626 2.21094 12.1958L5.65357 11.5675C6.31385 15.1967 8.22623 18.479 11.0574 20.8423C13.8886 23.2056 17.459 24.5001 21.1463 24.5001C24.8336 24.5001 28.404 23.2056 31.2352 20.8423C34.0664 18.479 35.9787 15.1967 36.639 11.5675L40.0817 12.194C39.4899 15.4616 38.0602 18.5195 35.9323 21.0683L39.7003 24.8378L37.2268 27.3123L33.4588 23.5428C31.7722 24.9503 29.857 26.0583 27.7963 26.8188L29.1747 31.9638L25.7951 32.8685L24.4166 27.7235C22.2516 28.0948 20.0392 28.0948 17.8742 27.7235L16.4975 32.8685Z" fill="#222222" />
                        </svg>}
                      </Box>
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>

            <Button
              background={'var(--Scd-kuning, #F3C03D)'}
              _hover={'false'}
              _active={'false'}
              color={'white'}
              borderRadius={'2px'}
              w='100%'
              mt='40px'
              type="submit"
              isLoading={isLoading ? false : true}
            >
              LOG IN
            </Button>
            <Text
              m='10px 0'
              fontSize={'12px'}
              color='var(--Brand-Biru, #05A)'
              fontWeight={'600'}
            >
              Lupa Password
            </Text>
            <Box display={'flex'}>
              <Divider w={'44%'} />
              <Text p='0 16px' m='-8px' zIndex={'999'} fontSize={'12px'} color="var(--Grayscale-Abu-Abu, #DBDBDB)"
                textAlign={'center'}
              >ATAU</Text>
              <Divider w={'44%'} />
            </Box>
            <Button
              bgColor={'white'}
              border="2px solid var(--Grayscale-Abu-Abu, #DBDBDB)"
              _hover={'false'}
              _active={'false'}
              borderRadius={'2px'}
              w='100%'
              mt='20px'
              fontSize={'14px'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 51 50" fill="none">
                <path d="M26.152 12.452C29.1135 12.4024 31.9753 13.5222 34.1165 15.5687L40.0915 9.59371C36.3207 6.05158 31.3252 4.10666 26.152 4.16663C22.2892 4.16503 18.5022 5.23778 15.2142 7.26498C11.9261 9.29217 9.26671 12.1939 7.5332 15.6458L14.4936 21.0416C15.2941 18.5703 16.8496 16.4122 18.941 14.8713C21.0324 13.3304 23.5544 12.4843 26.152 12.452Z" fill="#EA4335" />
                <path d="M7.53323 15.6459C6.07678 18.549 5.31836 21.7521 5.31836 25C5.31836 28.248 6.07678 31.4511 7.53323 34.3542L14.4936 28.9584C13.6226 26.3914 13.6226 23.6087 14.4936 21.0417L7.53323 15.6459Z" fill="#FBBC05" />
                <path d="M33.206 35.5583C31.5953 36.5922 29.7697 37.2446 27.8685 37.4657C25.9674 37.6869 24.0408 37.4709 22.2358 36.8342C20.4307 36.1976 18.795 35.1571 17.4532 33.7922C16.1114 32.4273 15.0991 30.7739 14.4935 28.9583L7.53516 34.3541C9.26835 37.8053 11.9271 40.7067 15.2143 42.7338C18.5016 44.761 22.2877 45.8341 26.1497 45.8333C31.2212 45.9706 36.1534 44.1648 39.9372 40.7853L33.206 35.5583Z" fill="#34A853" />
                <path d="M45.7732 21.2124H26.1523V29.2707H37.3648C37.1327 30.5454 36.6446 31.7598 35.9298 32.8405C35.2151 33.9212 34.2887 34.8457 33.2065 35.5582L39.9398 40.7874C41.9903 38.8127 43.6028 36.4291 44.673 33.7912C45.7433 31.1534 46.2473 28.32 46.1523 25.4749C46.1523 24.0437 46.0273 22.6187 45.7732 21.2124Z" fill="#4285F4" />
              </svg>
              <Text ml='3px'>
                Google
              </Text>
            </Button>
          </form>
        </Box>
        <Text textAlign={'center'} color={'#F3C03D'} mb='40px'>Daftar</Text>
      </Box>
    </Box>
  );
};

export default Login;
