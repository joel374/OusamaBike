import React, { useEffect, useState } from "react";
import Alert from "../../components/reuseable/Alert";
import { heroColor } from "../../components/reuseable/Logo";
import { Box, Text, useToast, Avatar } from "@chakra-ui/react";
import { axiosInstance } from "../../api";
import ChatCard from "../../components/ChatCard";

const MassageAdmin = () => {
  const [chat, setChat] = useState([]);
  const [side, setSide] = useState(null);
  const toast = useToast();

  const fetchChat = async () => {
    try {
      const response = await axiosInstance.get("/chat/getAdmin");
      setChat(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const renderChat = () => {
    return chat.map((val) => {
      return (
        <ChatCard
          username={val.User.username}
          message={val.Messages.pop()?.message}
          onClick={() => setSide(val)}
        />
      );
    });
  };

  useEffect(() => {
    fetchChat();
  }, []);
  return (
    <Box
      Box
      pl="237px"
      bgColor={"var(--N50,#F3F4F5)"}
      fontSize="14px"
      h="100vh"
    >
      <Box p="24px">
        {/* Header */}

        {/* Content */}
        <Box borderRadius={"8px"} bgColor="white">
          <Box minH={"584px"} display="flex">
            <Box w="350px" borderRight={"1px solid var(--N75,#E5E7E9)"}>
              <Text
                fontSize={"24px"}
                fontWeight="bold"
                p="16px"
                borderBottom={"1px solid var(--N75,#E5E7E9)"}
              >
                Chat
              </Text>
              {renderChat()}
            </Box>
            <Box w="100%">
              {side ? (
                <Box h="68.91" borderBottom={"1px solid var(--N75,#E5E7E9)"}>
                  <Box display={"flex"} p="10px 12px">
                    <Avatar mr="12px" name={side.User.username} />
                    <Box
                      fontWeight={"bold"}
                      fontSize="20px"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {side.User.username}
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MassageAdmin;
