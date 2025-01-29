"use client"
import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import Link from '@mui/material/Link'
import Image from 'next/image'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { readCategory } from '../lib/actions'
import clsx from 'clsx'
import { Box } from '@mui/material'

export default function CategoryCarousel() {
  const searchParams = useSearchParams();
  const [categoryItems, setCategoryItem] = useState([])
  useEffect(() => {
    const getAllCategory = async () => {
      const category = await readCategory()
      setCategoryItem(category);
    }
    getAllCategory();
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  function handleCarousel(category) {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('query', category);
    } else {
      params.delete('query')
    }
    router.push(`/products/category/?${params.toString()}`);
  }
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
  return (
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
      {categoryItems.map((category) => (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          // color: {searchParams.get("query")==category.name ? 'grey' : 'black'}
        }}
        // onClick={() => {
        //   handleCarousel(category.name)
        // }}
          key={category.name}>
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={80}
            height={80}
            className={clsx(
              { 'bg-gray-100': category.name === searchParams.get("query") }
            )}
          />
          <button className={clsx(
            { 'bg-cyan-950 text-white': category.name === searchParams.get("query") }
          )} onClick={() => {
            handleCarousel(category.name)
          }}>{category.name}</button>
        </Box>
      ))}
    </Carousel>
  )
}