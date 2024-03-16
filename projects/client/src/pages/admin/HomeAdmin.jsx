import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api';
import BoxHomeAdmin from '../../components/reuseable/admin/BoxHomeAdmin';

const HomeAdmin = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const fetch = async () => {
    try {
      const product = await axiosInstance.get('/product/get?is_active=true');
      const category = await axiosInstance.get('/category/get');
      const brand = await axiosInstance.get('/category/getBrand');
      setProduct(product.data.data);
      setCategory(category.data.data);
      setBrand(brand.data.data);
    } catch (error) {
      console.log(error.product);
      console.log(error.category);
      console.log(error.brand);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Box bgColor={'var(--N50,#F3F4F5)'} h='100%' pl='237px'>
        <Box gap='16px'>
          <BoxHomeAdmin data={product} message={'Jumlah Produk Aktif'} />
          <BoxHomeAdmin data={category} message={'Jumlah Produk Aktif'} />
          <BoxHomeAdmin data={brand} message={'Jumlah Produk Aktif'} />
        </Box>
      </Box>
    </>
  );
};

export default HomeAdmin;
