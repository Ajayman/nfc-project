'use client'
import { React, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import titleImage from '../public/title-image.svg'
import blouse from '../public/categories/blouse.svg'
import babyGown from '../public/categories/babygown.svg'
import gown from '../public/categories/gown.svg'
import secondGown from '../public/categories/gown2.svg'
import lehenga from '../public/categories/lehenga.svg'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Link from '@mui/material/Link'
import Carousel from 'react-multi-carousel'
import Product from './components/product'
import { products as items } from './products'
import 'react-multi-carousel/lib/styles.css'


export default function Home() {
  const [ProductItem, setProductItem] = useState(items);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };
  const categoryItems = [
    {
      name: "Blouse",
      imageSrc: blouse
    },
    {
      name: "Gown",
      imageSrc:  gown 
    },
    {
      name: "Long Gown",
      imageSrc:  secondGown 
    },
    {
      name: "Lehenga",
      imageSrc:  lehenga 
    },
    {
      name: "Baby Gown",
      imageSrc:  babyGown 
    }
  ]
  console.log(categoryItems[0].imageSrc)
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
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {categoryItems.map((category)=>(
          <Link href={`/products`} key={category.name}>
            <Image src={category.imageSrc} alt={category.name} width={100} height={100}/>
          </Link>
          ))}
      </Carousel>
      <Grid container>
        <Typography variant='h6'>New Items</Typography>
      </Grid>

      <Grid container spacing={2}>
        {ProductItem.map((item, key) => (
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

// function ImageCard(props){
//   return(
//     <Image />
//   )
// }