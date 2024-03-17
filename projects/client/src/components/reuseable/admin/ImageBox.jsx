import { Box, Image, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

const ImageBox = ({ desc, formik, name, setFieldImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef();

  const cancel = () => {
    setSelectedImage(null);
    formik.setFieldValue(`${name}`, null);
  };
  return (
    <Box>
      <Box display={"flex"}>
        <Box display={"flex"}>
          <Box w="152px" h="160px" m="10px 0" mr="12px">
            <Box
              borderRadius={"8px"}
              border={
                selectedImage
                  ? "1px solid var(--N100,#DBDEE2)"
                  : "2px dashed var(--N100,#DBDEE2)"
              }
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
                      formik.setFieldValue(`${name}`, e.target.files[0]);
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    accept="image/*"
                    name={name}
                    type="file"
                    display={"none"}
                    ref={inputFileRef}
                  />
                </>
              ) : (
                <>
                  <Image
                    w="140px"
                    h="99.9%"
                    src={
                      selectedImage ? selectedImage : `${process.env.REACT_APP_API_IMAGE_URL}${setFieldImage}`
                    }
                    objectFit={"contain"}
                  />
                  <Box mt="-28px" ml="110px">
                    <Box
                      bgColor={"white"}
                      color="white"
                      w="25px"
                      h="25px"
                      borderRadius={"4px"}
                      display="flex"
                      alignItems={"center"}
                      onClick={cancel}
                      justifyContent={"center"}
                      cursor="pointer"
                    >
                      <IoMdTrash color="#606060" />
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
