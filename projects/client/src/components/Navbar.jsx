import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";

const Navbar = () => {
  return (
    // <Box
    //   h="100px"
    //   border={"1px solid black"}
    //   position="sticky"
    //   top={"0"}
    //   left="0"
    //   right={"0"}
    // >
    //   <Box display={"flex"}>
    //     <Box w="200px" h="100px" border={"1px solid black"}>
    //       Logo
    //     </Box>
    //     <form>
    //       <Box>
    //         <Input placeholder="Search" />
    //       </Box>
    //     </form>
    //     <Box>
    //       <Button _active={false} _hover={false} bgColor="white">
    //         Login
    //       </Button>
    //       <Button>Register</Button>
    //     </Box>
    //   </Box>
    // </Box>
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      position={"sticky"}
      left="0"
      right={"0"}
      top="0"
      zIndex="9998"
    >
      <Box>
        <HStack height={"65px"} width="96%" mx={"auto"}>
          {/* Brand */}
          <Link to={"/"}>
            {/* <Image src={logo} width={"65px"} display={"inline"} mt={"4px"} /> */}
          </Link>
          <Link to={"/"}>
            <Text
              fontSize={"30px"}
              fontWeight="bold"
              color={"#0095DA"}
              display="inline"
              ml={"-3px"}
            >
              OusamaBike
            </Text>
          </Link>

          {/* Search Input */}
          <Box w={"100%"}>
            <form
            //   onSubmit={formikSearch.handleSubmit}
            >
              <FormControl>
                <InputGroup textAlign={"right"}>
                  <Input
                    type={"text"}
                    //   placeholder={placeholder}
                    name="search"
                    //   w={width}
                    //   onChange={searchHandler}
                    borderRightRadius="0"
                    //   value={formikSearch.values.search}
                    bgColor={"white"}
                    _hover={false}
                  />

                  <Button
                    borderLeftRadius={"0"}
                    type="submit"
                    bgColor={"white"}
                    _hover={false}
                    border="1px solid #e2e8f0"
                    borderLeft={"0px"}
                  >
                    <TbSearch />
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
          </Box>

          {/* navbar user logged in */}
          <Box
            display={"flex"}
            gap="4"
            fontSize="14px"
            fontWeight={"semibold"}
            pl={"8px"}
          >
            {/* {authSelector.username ? ( */}
            <Box gap="2" display={"flex"} pl={"15px"} mr={"0px"}>
              <Link to={"/login"}>
                <Box width={"73px"}>
                  <Button
                    _hover={"null"}
                    height="32px"
                    border={"1px solid #0095DA"}
                    bgColor={"white"}
                    color={"#0095DA"}
                    fontSize="12px"
                    fontWeight={"bold"}
                    borderRadius={"8px"}
                  >
                    Login
                  </Button>
                </Box>
              </Link>
              <Link to="/register">
                <Box width={"72px"}>
                  <Button
                    _hover={"null"}
                    height="32px"
                    borderRadius={"8px"}
                    bgColor={"#0095DA"}
                    border={"1px solid #0095DA"}
                    color={"#fff"}
                    fontWeight={"bold"}
                    fontSize="12px"
                    textAlign="center"
                    mx={"auto"}
                    w={"65px"}
                  >
                    Register
                  </Button>
                </Box>
              </Link>
            </Box>
            {/* )} */}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
