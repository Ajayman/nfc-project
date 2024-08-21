"use client"
import Carousel from 'react-multi-carousel'
import Link from '@mui/material/Link'
import Image from 'next/image'

export default function CategoryCarousel({categories, sendCategoryToParent}){
  function handleCarousel(category){
    sendCategoryToParent(category)
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
        {categories.map((category)=>(
          <Link sx={{
            display: "flex", 
            flexDirection:"column", 
            alignItems: "center", 
            textDecoration: "none"}}  
            onClick={()=>{
              handleCarousel(category.name)
            }}
            key={category.name}>
            <Image src={category.imageUrl} alt={category.name} width={100} height={100}/>
            <button>{category.name}</button>
          </Link>
          ))}
      </Carousel>
    )
}