import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../api"
import * as Yup from "yup"
import { color } from "../components/Navbar"
import Logo from "../components/reuseable/Logo"
import ButtonMod from "../components/reuseable/ButtonMod"

const Verification = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  })

  const formik = useFormik({
    initialValues: {
      otp: "",
      token: "",
    },
    onSubmit: async ({ otp, token }) => {
      try {
        setIsLoading(false)
        const response = await axiosInstance.patch("/auth/verification", {
          otp,
          token: params.verification_token,
        })

        toast({
          title: "Verifikasi Sukses",
          status: "success",
          variant: "top-accent",
          description: response.data.message,
        })

        formik.setFieldValue("otp", "")

        setIsLoading(true)

        navigate("/login")
      } catch (error) {
        console.log(error)
        toast({
          title: "Verifikasi Gagal",
          status: "warning",
          variant: "top-accent",
          description: error.response.data.message,
        })

        formik.setFieldValue("otp", "")

        setIsLoading(true)
      }
    },
    validationSchema: Yup.object({
      otp: Yup.number()
        .required("OTP tidak boleh kosong")
        .min(4, "OTP harus berisi 4 angka"),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  console.log(formik.values.otp)
  return (
    <Box>
      <Box justifyContent={"center"} display="flex">
        <Logo />
      </Box>
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
                Verifikasi
              </Text>

              <form onSubmit={formik.handleSubmit}>
                <FormControl m="20px 0" isInvalid={formik.errors.otp}>
                  <Box display="flex" justifyContent={"center"}>
                    <PinInput
                      name="otp"
                      value={formik.values.otp}
                      // onChange={formChangeHandler}
                    >
                      <PinInputField
                        name="otp"
                        mr={2}
                        value={formik.values.otp}
                        // onChange={formChangeHandler}
                      />
                      <PinInputField
                        name="otp"
                        mr={2}
                        value={formik.values.otp}
                        // onChange={formChangeHandler}
                      />
                      <PinInputField
                        name="otp"
                        mr={2}
                        value={formik.values.otp}
                        // onChange={formChangeHandler}
                      />
                      <PinInputField
                        name="otp"
                        value={formik.values.otp}
                        // onChange={formChangeHandler}
                      />
                    </PinInput>
                  </Box>
                  <Input
                    name="otp"
                    value={formik.values.otp}
                    onChange={formChangeHandler}
                  />
                  <Box display={"flex"} justifyContent="center">
                    <FormErrorMessage>{formik.errors.otp}</FormErrorMessage>
                  </Box>
                </FormControl>

                <Box textAlign={"center"} mt="2">
                  <ButtonMod
                    // isDisabled={!formik.values.otp}
                    // isDisabled={formik.values.otp == null ? false : true}
                    text={"Verifikasi"}
                  />
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Verification
