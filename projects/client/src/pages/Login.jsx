import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Box>
      <Text textAlign={"center"} fontSize="20px">
        OusamaBike
      </Text>
      <Box m="16% 0">
        <Box
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderRadius="8px"
          w="500px"
          h="auto"
          mx="auto"
        >
          <Box p="20px">
            <Text fontSize={"40px"} fontWeight="bold">
              Login
            </Text>

            <form>
              <FormControl m="20px 0">
                <Input placeholder="Email" />
              </FormControl>
              <FormControl m="15px 0">
                <InputGroup>
                  <Input placeholder="Password" />
                  <InputRightElement>
                    <Button bgColor={"white"}>Show</Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Box textAlign={"center"} mt="2">
                <Button>Submit</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
