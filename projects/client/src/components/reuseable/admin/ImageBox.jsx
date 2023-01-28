import { Box, Image, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

const ImageBox = ({ desc }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef();
  const cancelRef = React.useRef();
  return (
    <Box>
      <Box display={"flex"}>
        <Box display={"flex"}>
          <Box w="152px" h="160px" m="10px 0" mr="12px">
            <Box
              borderRadius={"8px"}
              border={"2px dashed var(--N100,#DBDEE2)"}
              w="140px"
              h="140px"
              verticalAlign={"middle"}
            >
              {selectedImage === null ? (
                <>
                  <Box
                    display={"flex"}
                    alignItems="center"
                    flexDirection={"column"}
                    fontWeight="normal"
                    fontSize="14px"
                    placeContent={"center"}
                    justifyContent="center"
                    w="140px"
                    h="140px"
                    onClick={() => inputFileRef.current.click()}
                  >
                    <Box>
                      <RiImageAddLine fontSize={"40px"} />
                    </Box>
                    <Box pt="12px">{desc}</Box>
                  </Box>
                  <Input
                    onChange={(e) => {
                      // formikAddNewAdmin.setFieldValue(
                      //   "profile_picture",
                      //   e.target.files[0]
                      // );
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    accept="image/*"
                    name="profile_picture"
                    type="file"
                    display={"none"}
                    ref={inputFileRef}
                  />
                </>
              ) : (
                <>
                  <Image
                    w="140px"
                    h="140px"
                    src={
                      selectedImage
                        ? selectedImage
                        : "Input Your Profile Picture"
                    }
                    objectFit={"fill"}
                  />
                  <Box display={"flex"} justifyContent="right" mt="-20px">
                    <Box
                      bgColor={"blackAlpha.700"}
                      color="white"
                      w="20px"
                      h="25px"
                      borderRadius={"50%"}
                      textAlign="center"
                      onClick={() => cancelRef}
                      justifyContent={"center"}
                    >
                      X
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageBox;

{
  /* <Button
                  borderRadius={"50%"}
                  w="auto"
                  h="30px"
                  border="2px solid"
                  onClick={() => inputFileRef.current.click()}
                  color={"#F7931E"}
                  _hover={false}
                  ml="392px"
                  //   bgColor={color}
                  size={"xs"}
                  mt="-33px"
                >
                  <TbCameraPlus color={"#F7931E"} />
                </Button>

                <Input
                  w="100%"
                  _hover={false}
                  fontWeight="bold"
                  bgColor={"white"}
                  onChange={(e) => {
                    formikAddNewAdmin.setFieldValue(
                      "profile_picture",
                      e.target.files[0]
                    );
                    setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  accept="image/*"
                  name="profile_picture"
                  type="file"
                  color="transparent"
                  border="0"
                  display={"none"}
                  ref={inputFileRef}
                /> */
}
