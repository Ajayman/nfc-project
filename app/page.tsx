import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import titleImage from '../public/title-image.svg'
import Image from 'next/image'
import Link from '@mui/material/Link'
import CategoryCarousel from './components/categoryCarousel'
import Product from './components/product'
import 'react-multi-carousel/lib/styles.css'

async function getProducts() {
  const res = await fetch(process.env.ROOT_URL + '/api/products')
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const { products } = await getProducts();
  console.log(products);
  async function searchProducts(data: FormData) {
    'use server';
    const product = data.get('product');

    const response = await fetch(process.env.ROOT_URL + '/api/searchProduct')
    if (response.ok) {
      const items = await response.json()
      console.log(items);
    }
  }
  const onSubmit = (data) => console.log(data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h1' fontWeight='bold'>Let’s enjoy with
            Nina’s Fashion</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent='flex-end'>
            <Image src={titleImage} alt='Title Image' width={450} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ pb: 2 }}>
        <Link variant='h5' href='/category' color='black' underline='hover'>Categories</Link>
      </Grid>
      <CategoryCarousel />
      <Grid container sx={{ mt: 3, mb: 2 }}>
        <Grid item sx={{ pb: 2 }}>
          <Typography variant='h5'>New Items</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map((item, key) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Product id={item.id} title={item.title} imageSrc={item.imageSrc} price={item.price} />
          </Grid>
        ))}
      </Grid>
    </Box >
  );
}
