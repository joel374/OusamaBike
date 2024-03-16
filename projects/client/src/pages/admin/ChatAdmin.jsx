import React, { useEffect, useState } from 'react';
import Alert from '../../components/reuseable/Alert';
import { heroColor } from '../../components/reuseable/Logo';
import { Box, Text, Avatar, Input, FormControl } from '@chakra-ui/react';
import { axiosInstance } from '../../api';
import ChatCard from '../../components/ChatCard';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../../components/reuseable/Message';
import moment from 'moment';
import { useFormik } from 'formik';

const ChatAdmin = () => {
  const [chat, setChat] = useState([]);
  const [side, setSide] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(side);
  const fetchChat = async () => {
    try {
      setIsLoading(false);
      const response = await axiosInstance.get('/chat/getAdmin');
      setChat(response.data.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const renderChat = () => {
    return (
      isLoading &&
      chat.map((val) => {
        return (
          <ChatCard
            username={val.User?.username}
            message={val.Messages.slice(-1)[0]?.message}
            onClick={() => setSide(val)}
          />
        );
      })
    );
  };

  const renderMessage = () => {
    return (
      isLoading &&
      side.Messages?.map((val, i, arr) => {
        const nextValue = arr[i + 1];
        return (
          <>
            <Box display={'flex'} justifyContent={'center'}>
              {new Date(val.createdAt).toLocaleDateString() !==
                new Date(nextValue?.createdAt).toLocaleDateString() ? (
                <Box
                  bgColor={heroColor}
                  p='2px 6px'
                  m='2px 4px'
                  borderRadius={'4px'}
                  fontSize={'12px'}
                  color={'white'}
                >
                  {moment(val.createdAt).format('LL')}
                </Box>
              ) : null}
            </Box>
            {val.UserId ? (
              <Box mt='2'>
                <Box mb='2' display='flex'>
                  <Box
                    borderRadius={'0px 20px 20px 20px'}
                    boxShadow={'rgb(0 0 0 / 12%) 0px 1px 6px 0px'}
                    p='8px 16px'
                    w={'max-content'}
                    r='0'
                  >
                    {val.message}
                  </Box>
                </Box>
                <Text fontSize={'10px'}>
                  {moment(val.createdAt).format('LT')}
                </Text>
              </Box>
            ) : (
              <Box mt='2'>
                <Box mb='2' display='flex' justifyContent={'right'}>
                  <Box
                    borderRadius={'20px 0px 20px 20px'}
                    boxShadow={'rgb(0 0 0 / 12%) 0px 1px 6px 0px'}
                    p='8px 16px'
                    w={'max-content'}
                    r='0'
                  >
                    {val.message}
                  </Box>
                </Box>
                <Text fontSize={'10px'} textAlign={'right'}>
                  {moment(val.createdAt).format('LT')}
                </Text>
              </Box>
            )}
          </>
        );
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      try {
        await axiosInstance.post(`/chat/postToUser/${side?.User.id}`, {
          message,
        });

        formik.setFieldValue('message', '');
        fetchChat();
      } catch (error) {
        console.log(error);
      }
    },
    validateOnChange: false,
  });
  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchChat();
  }, []);
  return (
    <Box
      Box
      pl='237px'
      bgColor={'var(--N50,#F3F4F5)'}
      fontSize='14px'
      h='100vh'
    >
      <Box p='24px'>
        {/* Header */}

        {/* Content */}
        <Box borderRadius={'8px'} bgColor='white' mt='80px'>
          <Box minH={'584px'} display='flex'>
            <Box w='350px' borderRight={'1px solid var(--N75,#E5E7E9)'}>
              <Text
                fontSize={'24px'}
                fontWeight='bold'
                p='16px'
                borderBottom={'1px solid var(--N75,#E5E7E9)'}
              >
                Chat
              </Text>
              {renderChat()}
            </Box>
            <Box w='100%'>
              {side ? (
                <Box h='68.91' borderBottom={'1px solid var(--N75,#E5E7E9)'}>
                  <Box display={'flex'} p='10px 12px'>
                    <Avatar mr='12px' name={side.User?.username} />
                    <Box
                      fontWeight={'bold'}
                      fontSize='20px'
                      display={'flex'}
                      alignItems={'center'}
                    >
                      {side.User?.username}
                    </Box>
                  </Box>
                  <Box p='0 16px 16px' h='690%' overflowY={'scroll'}>
                    {renderMessage()}
                  </Box>
                  <form>
                    <Box display={'flex'} p='0 16px 16px'>
                      <FormControl isInvalid={formik.errors.message}>
                        <Input
                          border={'1px solid var(--N75,#E5E7E9)  !important'}
                          borderRadius='20px'
                          _placeholder={{ fontSize: '13px' }}
                          placeholder='Tulis pesan...'
                          value={formik.values.message}
                          name='message'
                          type={'text'}
                          onChange={formChangeHandler}
                        />
                      </FormControl>
                      <Box
                        h='40px'
                        ml='8px'
                        w='40px'
                        display={'flex'}
                        alignItems='center'
                        justifyContent={'center'}
                        borderRadius='50%'
                        bgColor={heroColor}
                        onClick={formik.handleSubmit}
                      >
                        <AiOutlineSend fontSize={'20px'} color='white' />
                      </Box>
                    </Box>
                  </form>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatAdmin;
