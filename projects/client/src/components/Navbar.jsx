import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from '@chakra-ui/react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { BiHeart, BiLogOutCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Logo, { heroColor } from './reuseable/Logo';
import { logout } from '../redux/features/authSlice';
import { RiAdminLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { setTotalCart } from '../redux/features/cartSlice';
import { axiosInstance } from '../api';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const authSelector = useSelector((state) => state.auth);
  const cartSelector = useSelector((state) => state.cart);
  // console.log(cartSelector);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const fetchMyCart = async () => {
    try {
      const response = await axiosInstance.get('/cart');
      setCartItems(response.data.data);
      dispatch(setTotalCart(response.data.data.length));
    } catch (error) {
      console.log(error);
    }
  };

  const renderCart = () => {
    return cartItems.map((val) => {
      return (
        <Box
          display={'flex'}
          p='8px 0'
          fontSize={'14px'}
          fontWeight={'bold'}
          borderBottom={'1px solid #e6e6e6'}
          onClick={() => navigate('/cart')}
        >
          <Image
            src={
              process.env.REACT_APP_API_IMAGE_URL +
              val.Product.Image_Urls[0].image_url
            }
            w='40px'
            h='40px'
            mr='8px'
          />
          <Box w='100%'>
            <Box textOverflow={'ellipsis'} overflow={'hidden'} h='20px'>
              {val.Product.product_name}
            </Box>
            <Box fontWeight={'thin'} fontSize={'10px'} h='16px' mt='2px'>
              {val.quantity} barang
            </Box>
          </Box>
          <Box
            ml='8px'
            display={'flex'}
            alignItems={'center'}
            color={'#fa591d'}
          >
            Rp.{val.Product.price.toLocaleString('id-ID')}
          </Box>
        </Box>
      );
    });
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem('auth_token');
    dispatch(logout());

    toast({
      status: 'info',
      title: 'Logout Sukses',
      description: 'Akun Logout',
      variant: 'top-accent',
    });
  };

  const changeBtnHandler = (e) => {
    setSearchValue(e.target.value);
    // onChange(e);
  };

  const keyDownBtnHandler = (e) => {
    if (e.key === 'Enter') {
      navigate({
        pathname: '/product',
        search: createSearchParams({
          name: searchValue,
        }).toString(),
      });
      // onKeyDown(e);
    }
  };

  useEffect(() => {
    fetchMyCart();
  }, []);

  return (
    <Box
      boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
      position={'fixed'}
      left='0'
      right={'0'}
      top='0'
      zIndex='9998'
      backgroundColor={heroColor}
    >
      <Box>
        <HStack
          height={{ lg: '65px', md: '52px', base: '52px' }}
          width='96%'
          mx={{ lg: 'auto', md: '0', base: '0' }}
          p={{ lg: '0', md: '8px 10px 4px 16px', base: '8px 10px 4px 16px' }}
        >
          <Link to={'/'}>
            <Box display={{ lg: 'flex', md: 'none', base: 'none' }}>
              <Logo color={'white'} />
            </Box>
          </Link>

          <Box display={'flex'} alignItems='center' w='100%'>
            {/* Search Input */}
            <Box w='100%' ml={'16px'}>
              <form
              //   onSubmit={formikSearch.handleSubmit}
              >
                <FormControl>
                  <InputGroup textAlign={'right'}>
                    <Input
                      type={'text'}
                      placeholder={'Cari di OusamaBike'}
                      _placeholder={{
                        fontSize: '14px',
                      }}
                      name='search'
                      h={'40px'}
                      pb={'0'}
                      //   w={width}
                      // onChange={searchHandler}
                      onChange={changeBtnHandler}
                      onKeyDown={keyDownBtnHandler}
                      value={searchValue}
                      borderRightRadius='0'
                      //   value={formikSearch.values.search}
                      bgColor={'white'}
                      _hover={false}
                    />

                    <Button
                      borderLeftRadius={'0'}
                      type='submit'
                      bgColor={'white'}
                      h={'40px'}
                      _hover={false}
                      border={`1px solid c`}
                      borderLeft={'0px'}
                    >
                      <TbSearch />
                    </Button>
                  </InputGroup>
                </FormControl>
              </form>
            </Box>

            {/* Cart */}
            <Box ml='20px' mr='4px'>
              <Popover trigger={'hover'}>
                <PopoverTrigger>
                  <Box
                    w='37px'
                    h='37px'
                    onClick={() => navigate('/cart')}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    color={'white'}
                    _hover={{
                      bgColor: 'var(--N50,#F3F4F5)',
                      color: heroColor,
                      borderRadius: '3px',
                    }}
                    p='5px 0'
                  >
                    <BsCart3 />
                    {cartSelector.totalCart > 0 ? (
                      <Box
                        ml='20px'
                        mb='20px'
                        display={'inline'}
                        position={'absolute'}
                      >
                        <Box
                          display={'flex'}
                          color={'white'}
                          bgColor={'red'}
                          borderRadius={'50%'}
                          fontSize={'10px'}
                          p='8px'
                          fontWeight={'800'}
                          w={cartSelector.totalCart > 9 ? 'auto' : '12px'}
                          h='12px'
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          {cartSelector.totalCart}
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                </PopoverTrigger>
                <PopoverContent w={'350px'} bgColor={'white'}>
                  <PopoverBody p='0' cursor={'pointer'}>
                    <Box m='0 16px' bgColor={'white'}>
                      <Box
                        p='16px 0 8px'
                        borderBottom={'1px solid #e6e6e6'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Text fontWeight={'bold'} fontSize={'14px'}>
                          Keranjang ({cartSelector.totalCart})
                        </Text>
                        <Text
                          fontWeight={'bold'}
                          fontSize={'14px'}
                          color={heroColor}
                          onClick={() => navigate('/cart')}
                        >
                          Lihat Sekarang
                        </Text>
                      </Box>
                      {renderCart()}
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              {/*  */}
            </Box>
          </Box>

          <Box
            display={{ lg: 'flex', md: 'none', base: 'none' }}
            gap='4'
            fontSize='14px'
            fontWeight={'semibold'}
            pl={'8px'}
          >
            {/* LoggedIn */}
            {authSelector.username ? (
              <Box display={'flex'} mr='2' ml='1' cursor={'pointer'}>
                <Popover trigger={'hover'}>
                  <PopoverTrigger>
                    <Box
                      display={'flex'}
                      my='auto'
                      color={'white'}
                      minW={'113px'}
                      maxW='200px'
                      paddingLeft='5px'
                      paddingRight={'5px'}
                      _hover={{
                        bgColor: 'var(--N50,#F3F4F5)',
                        color: heroColor,
                        borderRadius: '3px',
                      }}
                    >
                      <Avatar
                        size='sm'
                        name={authSelector.username}
                        mr={2}
                        ml={2}
                        width={'25px'}
                        height='25px'
                        my='auto'
                      />
                      <Text my='auto' padding={'8px'}>
                        {authSelector.username.split(' ')[0]}
                      </Text>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent w={'300px'} mr='4' bgColor={'white'}>
                    <PopoverBody>
                      <Box p='2 4' bgColor={'white'}>
                        <Box
                          boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                          display={'flex'}
                          my='auto'
                          padding='6px 12px'
                          borderRadius={'5px'}
                          bgColor={'white'}
                          cursor={'pointer'}
                        >
                          <Avatar
                            name={authSelector.username}
                            mr={2}
                            width={'50px'}
                            height='50px'
                            my='auto'
                          />
                          <Text
                            my='auto'
                            padding={'8px'}
                            fontSize='16px'
                            fontWeight={'bold'}
                            textOverflow='ellipsis'
                          >
                            {authSelector.username}
                          </Text>
                        </Box>

                        <Box fontSize={'14px'} p='10px 0'>
                          <Link to={'/admin'}>
                            <Box
                              display={
                                authSelector.is_admin === true ? 'flex' : 'none'
                              }
                              _hover={{
                                bgColor: 'var(--N50,#F3F4F5)',
                                borderRadius: '7px',
                                color: heroColor,
                              }}
                              p={'5px 4px'}
                              b='0'
                            >
                              <Text>Admin</Text>
                              <Box my='auto' ml='1'>
                                <RiAdminLine />
                              </Box>
                            </Box>
                          </Link>
                          <Link to={'/wishlist'}>
                            <Box
                              display={'flex'}
                              _hover={{
                                bgColor: 'var(--N50,#F3F4F5)',
                                borderRadius: '7px',
                                color: heroColor,
                              }}
                              p={'5px 4px'}
                              b='0'
                            >
                              <Text>Wishlist</Text>
                              <Box my='auto' ml='1'>
                                <BiHeart />
                              </Box>
                            </Box>
                          </Link>
                          <Box
                            display={'flex'}
                            _hover={{
                              bgColor: 'var(--N50,#F3F4F5)',
                              borderRadius: '7px',
                              color: heroColor,
                            }}
                            p={'5px 4px'}
                            b='0'
                            onClick={logoutBtnHandler}
                          >
                            <Text>Logout</Text>
                            <Box my='auto' ml='1'>
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
              // Before login
              <Box gap='2' display={'flex'} pl={'15px'} mr={'0px'}>
                <Link to={'/login'}>
                  <Box width={'73px'}>
                    <Button
                      _hover={false}
                      _active={false}
                      height='32px'
                      border={`1px solid ${heroColor}`}
                      bgColor={'white'}
                      color={heroColor}
                      fontSize='12px'
                      fontWeight={'bold'}
                      borderRadius={'8px'}
                    >
                      Masuk
                    </Button>
                  </Box>
                </Link>
                <Link to='/register'>
                  <Box width={'72px'}>
                    <Button
                      _hover={false}
                      _active={false}
                      height='32px'
                      borderRadius={'8px'}
                      bgColor={heroColor}
                      border={`1px solid ${heroColor}`}
                      color={'#fff'}
                      fontWeight={'bold'}
                      fontSize='12px'
                      textAlign='center'
                      mx={'auto'}
                      w={'65px'}
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
