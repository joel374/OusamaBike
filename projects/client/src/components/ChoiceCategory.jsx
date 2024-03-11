import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import ChoiceList from "./CategoryChoiceList";

const ChoiceCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(false);
      const response = await axiosInstance.get("/category/get");
      setCategory(response.data.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategory = () => {
    return (
      loading &&
      Array.from(category)?.map((val) => {
        return <ChoiceList category_name={val.category_name} id={val.id} />;
      })
    );
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <Box
      w="1208px"
      p="16px"
      m="auto"
      boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
      borderRadius={"12px"}
    >
      <Box
        fontSize={"20px"}
        fontWeight={"bold"}
        mb="16px"
        fontFamily={"sans-serif"}
      >
        Daftar Kategori
      </Box>
      <Box display={"flex"}>
        {renderCategory()}
        {loading === false ? "Loading " : null}
      </Box>
    </Box>
  );
};

export default ChoiceCategory;
