import { Avatar, Box, FormControl, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { AiOutlineSend } from 'react-icons/ai';
import { axiosInstance } from '../api';
import { heroColor } from '../components/reuseable/Logo';
import Message from '../components/reuseable/Message';
const Chat = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      try {
        await axiosInstance.post('/chat/post', { message });

        formik.setFieldValue('message', '');
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
  return (
    <Box p='19px 0 0 ' mx='auto' w='1188px'>
      <Box
        borderRadius={'8px'}
        boxShadow={'rgb(0 0 0 / 12%) 0px 1px 6px 0px'}
        position='relative'
      >
        <Box p='8px 16px' display={'flex'}>
          <Box w='48px' h='48px'>
            <Avatar />
          </Box>
          <Box
            fontWeight={'bold'}
            ml='16px'
            display={'flex'}
            alignItems='center'
          >
            OusamaBike (Admin)
          </Box>
        </Box>
        <Box h='673px'>
          <Box bottom={'0'} position='absolute' p='0 16px 16px' w='100%'>
            <Box mb='2'>
              <Message />
            </Box>
            <form>
              <Box display={'flex'}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
