import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import titleImage from 'public/title-image.svg'
import Image from 'next/image'
import Link from '@mui/material/Link'
import CategoryCarousel from '@components/categoryCarousel'
import 'react-multi-carousel/lib/styles.css'
import { fetchProductType } from '../lib/actions'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductCard from '../components/FilterProducts'

export const metadata: Metadata = {
  title: 'Home | NFC'
}
export default async function Home() {
  const newProducts = await fetchProductType('New')
  const oldProduct = await fetchProductType('Old Stock')
  const trendingProduct = await fetchProductType('Trending')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h1' fontWeight='bold'>
            Let’s enjoy with
            Nina’s Fashion
          </Typography>
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
      {/* <Suspense fallback={<p>Loading</p>}> */}
        <CategoryCarousel />
      {/* </Suspense> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ pb: 2, mt: 4 }}>
          <Typography variant='h5'>New Items</Typography>
        </Grid>
        {/* <Suspense fallback={<p>Loading</p>}> */}
          {newProducts.map((item, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        {/* </Suspense> */}
      </Grid >

      <Grid container spacing={2}>
        <Grid xs={12} item sx={{ pb: 2, mt: 4 }}>
          <Typography variant='h5'>Trending Products</Typography>
        </Grid>
        {/* <Suspense fallback={<p>Loading</p>}> */}
          {trendingProduct.map((item, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        {/* </Suspense> */}
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} item sx={{ pb: 2, mt: 4 }}>
          <Typography variant='h5'>Old Products</Typography>
        </Grid>
        {/* <Suspense fallback={<p>Loading</p>}> */}
          {oldProduct.map((item, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <ProductCard item={item} />
            </Grid>
          ))}
        {/* </Suspense> */}
      </Grid>
    </Box >
  );
}
