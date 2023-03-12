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
  useToast,
} from "@chakra-ui/react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { BiHeart, BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Logo, { heroColor } from "./reuseable/Logo";
import { logout } from "../redux/features/authSlice";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());

    toast({
      status: "info",
      title: "Akun Logout",
      variant: "top-accent",
    });
  };

  const changeBtnHandler = (e) => {
    setSearchValue(e.target.value);
    // onChange(e);
  };

  const keyDownBtnHandler = (e) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "/product",
        search: createSearchParams({
          name: searchValue,
        }).toString(),
      });
      // onKeyDown(e);
    }
  };

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
            <Logo />
          </Link>

          {/* Search Input */}
          <Box w={"100%"}>
            <form
            //   onSubmit={formikSearch.handleSubmit}
            >
              <FormControl ml="16px">
                <InputGroup textAlign={"right"}>
                  <Input
                    type={"text"}
                    placeholder={"Find in OusamaBike"}
                    _placeholder={{
                      fontSize: "14px",
                    }}
                    name="search"
                    //   w={width}
                    // onChange={searchHandler}
                    onChange={changeBtnHandler}
                    onKeyDown={keyDownBtnHandler}
                    value={searchValue}
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
                    border={`1px solid #e6e6e6`}
                    borderLeft={"0px"}
                  >
                    <TbSearch />
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
          </Box>

          <Box
            display={"flex"}
            gap="4"
            fontSize="14px"
            fontWeight={"semibold"}
            pl={"8px"}
          >
            {/* Navbar sudah login */}
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
                        bgColor: "var(--N50,#F3F4F5)",
                        color: heroColor,
                        borderRadius: "3px",
                      }}
                    >
                      <Avatar
                        size="sm"
                        name={authSelector.username}
                        mr={2}
                        ml={2}
                        width={"25px"}
                        height="25px"
                        my="auto"
                        // src={`${apiImg}/${authSelector.profile_picture}`}
                      />
                      <Text my="auto" padding={"8px"}>
                        {authSelector.username.split(" ")[0]}
                      </Text>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent w={"300px"} mr="4" bgColor={"white"}>
                    <PopoverBody>
                      <Box p="2 4" bgColor={"white"}>
                        <Box
                          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                          display={"flex"}
                          my="auto"
                          padding="6px 12px"
                          borderRadius={"5px"}
                          bgColor={"white"}
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
                            textOverflow="ellipsis"
                          >
                            {authSelector.username}
                          </Text>
                        </Box>

                        <Box fontSize={"14px"} p="10px 0">
                          <Link to={"/admin"}>
                            <Box
                              display={
                                authSelector.is_admin === true ? "flex" : "none"
                              }
                              _hover={{
                                bgColor: "var(--N50,#F3F4F5)",
                                borderRadius: "7px",
                                color: heroColor,
                              }}
                              p={"5px 4px"}
                              b="0"
                            >
                              <Text>Admin</Text>
                              <Box my="auto" ml="1">
                                <RiAdminLine />
                              </Box>
                            </Box>
                          </Link>
                          <Link to={"/wishlist"}>
                            <Box
                              display={"flex"}
                              _hover={{
                                bgColor: "var(--N50,#F3F4F5)",
                                borderRadius: "7px",
                                color: heroColor,
                              }}
                              p={"5px 4px"}
                              b="0"
                            >
                              <Text>Wishlist</Text>
                              <Box my="auto" ml="1">
                                <BiHeart />
                              </Box>
                            </Box>
                          </Link>
                          <Box
                            display={"flex"}
                            _hover={{
                              bgColor: "var(--N50,#F3F4F5)",
                              borderRadius: "7px",
                              color: heroColor,
                            }}
                            p={"5px 4px"}
                            b="0"
                            onClick={logoutBtnHandler}
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
              // User belum login
              <Box gap="2" display={"flex"} pl={"15px"} mr={"0px"}>
                <Link to={"/login"}>
                  <Box width={"73px"}>
                    <Button
                      _hover={false}
                      _active={false}
                      height="32px"
                      border={`1px solid ${heroColor}`}
                      bgColor={"white"}
                      color={heroColor}
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
                      _hover={false}
                      _active={false}
                      height="32px"
                      borderRadius={"8px"}
                      bgColor={heroColor}
                      border={`1px solid ${heroColor}`}
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
