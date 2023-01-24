import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
  return (
    <Box
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      position={"sticky"}
      left="0"
      right={"0"}
      top="0"
      zIndex="9998"
      backgroundColor={"white"}
    >
      <Box>
        <HStack height={"65px"} width="96%" mx={"auto"}>
          {/* Brand */}
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

          {/* Navbar user logged in */}
          <Box
            display={"flex"}
            gap="4"
            fontSize="14px"
            fontWeight={"semibold"}
            pl={"8px"}
          >
            {authSelector.username ? (
              <Box display={"flex"} mr="2" ml="1" cursor={"pointer"}>
                <Popover trigger={"hover"}>
                  <PopoverTrigger>
                    <Box
                      display={"flex"}
                      my="auto"
                      minW={"113px"}
                      maxW="200px"
                      paddingLeft="5px"
                      paddingRight={"5px"}
                      _hover={{
                        bgColor: "#A5D8F8",
                        color: "orange",
                        borderRadius: "3px",
                      }}
                      color={"rgba(0,0,0,.54)"}
                    >
                      <Avatar
                        size="sm"
                        name={authSelector.username}
                        mr={2}
                        width={"25px"}
                        height="25px"
                        my="auto"
                        // src={`${apiImg}/${authSelector.profile_picture}`}
                      />
                      <Text
                        my="auto"
                        padding={"8px"}
                        textTransform={"capitalize"}
                      >
                        {authSelector.username.split(" ")[0]}
                      </Text>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent w={"300px"} mr="4" bgColor={"#E5F9F6"}>
                    <PopoverBody>
                      <Box p="2 4" bgColor={"#E5F9F6"}>
                        <Box
                          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                          display={"flex"}
                          my="auto"
                          padding="6px 12px"
                          borderRadius={"5px"}
                          bgColor={"#E5F9F6"}
                          cursor={"pointer"}
                        >
                          <Avatar
                            name={authSelector.username}
                            mr={2}
                            width={"50px"}
                            height="50px"
                            my="auto"
                            // src={`${apiImg}/${authSelector.profile_picture}`}
                          />
                          <Text
                            my="auto"
                            padding={"8px"}
                            fontSize="16px"
                            fontWeight={"bold"}
                            color={"rgba(0,0,0,.54)"}
                            textTransform={"capitalize"}
                          >
                            {authSelector.username}
                          </Text>
                        </Box>

                        <Box fontSize={"14px"} p="10px 0">
                          <Link to="/user/profile">
                            <Box
                              _hover={{
                                bgColor: "#A5D8F8",
                                borderRadius: "7px",
                              }}
                              p={"5px 4px"}
                            >
                              <Text>Profile</Text>
                            </Box>
                          </Link>

                          <Link to={"/transaction-list"}>
                            <Box
                              _hover={{
                                bgColor: "#A5D8F8",
                                borderRadius: "7px",
                              }}
                              p={"5px 4px"}
                            >
                              <Text>Transaction-list</Text>
                            </Box>
                          </Link>
                          <Box
                            display={"flex"}
                            _hover={{
                              bgColor: "#A5D8F8",
                              borderRadius: "7px",
                            }}
                            p={"5px 4px"}
                            b="0"
                            // onClick={logoutBtnHandler}
                          >
                            <Text>Logout</Text>
                            <Box my="auto" ml="1">
                              <BiLogOutCircle />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>
            ) : (
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
                      Masuk
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
                      Daftar
                    </Button>
                  </Box>
                </Link>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
