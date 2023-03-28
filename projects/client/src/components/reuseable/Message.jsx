import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";

const Message = () => {
  const [chat, setChat] = useState([]);
  const fetchChat = async () => {
    try {
      const response = await axiosInstance.get("/chat/get");
      console.log(response.data.data);
      setChat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderChat = () => {
    return chat.map((val) => {
      return val.to === "admin" ? (
        <Box mt="2">
          <Box mb="2" justifyContent={"right"} display="flex">
            <Box
              borderRadius={"20px 0px 20px 20px"}
              boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
              p="8px 16px"
              w={"max-content"}
              r="0"
            >
              {val.message}
            </Box>
          </Box>
          <Text fontSize={"10px"} textAlign="right">
            {moment(val.createdAt).format("LT")}
          </Text>
        </Box>
      ) : (
        <Box mt="2">
          <Box mb="2" display="flex">
            <Box
              borderRadius={"0px 20px 20px 20px"}
              boxShadow={"rgb(0 0 0 / 12%) 0px 1px 6px 0px"}
              p="8px 16px"
              w={"max-content"}
              r="0"
            >
              {val.message}
            </Box>
          </Box>
          <Text fontSize={"10px"}>{moment(val.createdAt).format("LT")}</Text>
        </Box>
      );
    });
  };
  useEffect(() => {
    fetchChat();
  }, []);
  return <Box>{renderChat()}</Box>;
};

export default Message;
