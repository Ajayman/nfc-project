import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import titleImage from '../public/title-image.svg'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Link from '@mui/material/Link'
import CategoryCarousel from './components/categoryCarousel'
import Product from './components/product'
import 'react-multi-carousel/lib/styles.css'

 async function getProducts(){
  const res = await fetch('http://localhost:3000/api/products')
  if(!res.ok){
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const {products} = await getProducts();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid xs={6}>
          <Typography variant='h4'>Let’s enjoy with
            Nina’s Fashion</Typography>
        </Grid>
        <Grid xs={6}>
          <Image src={titleImage} alt='Title Image' width={150} />
        </Grid>
      </Grid>
      <Paper
        component='form'
        elevation={3}
        sx={{ p: '2px 4px', display: {xs: 'flex', md: 'none'}, alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Anything Here"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container>
        <Grid xs={9}>
          <Typography variant='h6'>Categories</Typography>
        </Grid>
        <Grid xs={3}>
          <Link href='google.com'>See All</Link>
        </Grid>
      </Grid>
      <CategoryCarousel />
      <Grid container>
        <Typography variant='h6'>New Items</Typography>
      </Grid>

      <Grid container spacing={2}>
        {products.map((item, key) => (
          < Grid xs={6} sm={4} md={3} key={item.id}>
            <Link href={`/products/${item.id}`} key={item.id}>

              <Product title={item.title} imageSrc={item.imageSrc} price={item.price} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box >
  );
}
