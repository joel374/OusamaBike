import { Avatar, Box } from "@chakra-ui/react";

const ChatCard = ({ username, message, onClick }) => {
  return (
    <Box p="4px" onClick={onClick} cursor={"pointer"}>
      <Box display={"flex"} p="10px 12px">
        <Avatar mr="12px" name={username} />
        <Box>
          <Box fontWeight={"bold"} fontSize="16px">
            {username}
          </Box>
          {message}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatCard;
