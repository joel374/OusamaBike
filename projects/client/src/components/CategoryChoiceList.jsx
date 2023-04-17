import { Box, Image } from "@chakra-ui/react";
import bmx from "../assets/BMX.jpeg";
import { Link } from "react-router-dom";

const CategoryChoiceList = ({ category_name, id }) => {
  return (
    <Link to={`/product?kategori=${id}`}>
      <Box p="0 8px">
        <Box
          w="133px"
          h="130px"
          borderRadius={"8px"}
          border={"1px solid var(--NN200,#D6DFEB)"}
          justifyContent={"center"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          <Image src={bmx} w="90px" m="auto" mt="6px" />
          {category_name}
        </Box>
      </Box>
    </Link>
  );
};

export default CategoryChoiceList;
