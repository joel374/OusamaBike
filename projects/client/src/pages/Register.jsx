import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Divider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { axiosInstance } from "../api";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Bar from "../components/Bar";
import banner from '../assets/banner.png';
import { RiEyeFill } from "react-icons/ri";
import ErrorNetworkToast from "../components/reuseable/ErrorNetworkToast";

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
        const network = ErrorNetworkToast(error, toast);
        if (!network) {
          toast({
            title: "Login Gagal",
            status: "warning",
            variant: "top-accent",
            description: error.response.data.message || error.message,
          });
        }
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
      bgColor={'#231f20'}
      h={'100vh'}
      alignItems={{ base: "center", lg: "none" }}
      justifyContent={{ base: "center", lg: "none" }}
      display={{ base: "flex", lg: "block" }}
    >
      <Bar />
      <Image display={{ lg: 'block', base: 'none' }} src={banner} w='100%' mt='80px' />
      <Box
        position="absolute"
        top={{ lg: "10%", base: 'none' }}
        left={{ lg: "60%", base: 'none' }}
        backgroundColor="white"
        w={{ lg: '400px', base: "90%" }}
      >
        <Text fontSize={'20px'} fontWeight={'600'} p='22px 30px 0px'>
          Daftar
        </Text>
        <Box p='0 30px 30px'>
          <form onSubmit={formik.handleSubmit}>
            <Box mt='30px'>
              <FormControl m={"20px 0"} isInvalid={formik.errors.email}>
                <Input
                  placeholder="Username"
                  name="username"
                  type={"username"}
                  borderRadius={'2px'}
                  _placeholder={{ fontSize: '14px', color: 'var(--Grayscale-Gray, #BDBDBD)' }}
                  padding='12px'
                  onChange={formChangeHandler}
                  value={formik.values.username}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
            </Box>
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
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
              mb='22px'
              type="submit"
              isLoading={isLoading ? false : true}
            >
              DAFTAR
            </Button>
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
        <Box textAlign={'center'} mb='40px'>
          Sudah punya akun? <Link to={'/login'}>Masuk</Link>
        </Box>
      </Box>
    </Box >
  );
};

export default Register;
