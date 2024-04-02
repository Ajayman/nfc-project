'use client'
import {React, useState} from 'react'
import {useParams} from 'next/navigation'
import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
// import Carousel from 'react-multi-carousel';
import {products as productItems} from '../../products'
import "react-multi-carousel/lib/styles.css"


export default function ProductDetail() {
    const params = useParams()
    const [items, setItems] = useState(productItems);
    const result = items.filter((item)=> item.id == params.productId)
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                <Grid xs={4}>
                    <IconButton aria-label="back">
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center">
                    <Typography variant="subtitle1" component="div">
                        {result[0].name}
                    </Typography>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="right">
                    <IconButton aria-label="heart">
                        <FavoriteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography variant='h6'>
                {result[0].title}
            </Typography>
            <Typography variant='subtitle1'>
                {result[0].description}
            </Typography>
            <Stack spacing={2} direction="row" justifyContent='center'>
                <Button variant="outlined">S</Button>
                <Button variant="contained">M</Button>
                <Button variant="outlined">L</Button>
            </Stack>
            <Stack spacing={4} direction='row' justifyContent='center'>
                <Button variant='contained'>Add To Cart</Button>
                <Typography>Nrs. {result[0].price}</Typography>
            </Stack>
        </Box >
    )
}

