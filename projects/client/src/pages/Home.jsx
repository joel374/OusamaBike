import { Box, Grid, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../api"

const Home = () => {
  const [seeMore, setSeeMore] = useState(false)
  const [product, setProduct] = useState([])

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/product/get")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <Box>
      <Box mx="auto" w="1190px" mt="36px" mb="50px">
        <Box display={"flex"}>
          <Box w="214px" fontSize={"14px"} fontWeight="bold">
            <Text m="16px 0">Filter</Text>
            <Box
              boxShadow={"rgb(49 53 59 / 12%) 0px 1px 6px 0px"}
              borderRadius="12px"
            >
              <Box
                p="10px 8px 9px 12px"
                h={seeMore}
                onClick={() => setSeeMore("200px")}
              >
                Kategori
              </Box>
              <Box p="10px 8px 9px 12px">Merek</Box>
            </Box>
          </Box>
          <Box p="0px 4px 0px 30px">
            <Box mb="16px" />
            {/* Card */}
            <Grid templateColumns={"repeat(5,1fr)"}>
              <Box p="0px 8px 16px">
                <Box
                  w="175.5px"
                  boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
                  borderRadius="9px"
                >
                  <Image
                    src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/12/21/45d2b17c-1d07-46e6-8bf4-7dfaae941df6.jpg"
                    h="175.55px"
                    objectFit={"cover"}
                    objectPosition={"center center"}
                    borderTopRadius="9px"
                  />
                  <Box p="8px">
                    <Box mb="4px" fontSize={"12.04px"}>
                      <Text
                        textOverflow="ellipsis"
                        overflow={"hidden"}
                        h="36.1px"
                      >
                        Sepeda Lipat 16 2980 RX 9.0 PACIFIC - Noir Red, Sepeda
                        bla bla bla bla
                      </Text>
                    </Box>
                    <Box mb="4px" fontSize={"14px"} fontWeight="bold">
                      Rp.2.750.000
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box p="0px 8px 16px">
                <Box
                  w="175.5px"
                  boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
                  borderRadius="9px"
                >
                  <Image
                    src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/12/21/45d2b17c-1d07-46e6-8bf4-7dfaae941df6.jpg"
                    h="175.55px"
                    objectFit={"cover"}
                    objectPosition={"center center"}
                    borderTopRadius="9px"
                  />
                  <Box p="8px">
                    <Box mb="4px" fontSize={"12.04px"}>
                      <Text
                        textOverflow="ellipsis"
                        overflow={"hidden"}
                        h="36.1px"
                      >
                        Sepeda Lipat 16 2980 RX 9.0 PACIFIC - Noir Red, Sepeda
                        bla bla bla bla
                      </Text>
                    </Box>
                    <Box mb="4px" fontSize={"14px"} fontWeight="bold">
                      Rp.2.750.000
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
