'use client'
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";
import Button from '@mui/material/Button';
import ChooseSize from "app/components/Variant";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import ProductRating from "@/app/components/productRating"
import { Product } from '@prisma/client';
export default function ProductDetailContent({item}: Product) {
    console.log(item)
    const [product, setProduct] = useState(item)
    return (
        <Grid xs={12} md={5}>
            <Chip label={product.category} />
            <Grid container sx={{ justifyContent: 'space-between' , alignItems: 'center' }}>
                <Grid xs={6}>
                    <Typography variant="h4">
                        {product.name}
                    </Typography>
                </Grid>
                <Grid xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Button size="small" variant="outlined" startIcon={<FavoriteBorderOutlined />}>
                        Add to Wishlist
                    </Button>
                </Grid>
            </Grid>

            <ProductRating />
            <Typography variant="h6">
                {product.description}
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant='h4'>
                    Nrs. {product.price}
                </Typography>
                <Button size="large" variant='contained'>Add To Cart</Button>
            </Box>
            <hr />
            <ChooseSize type="Size" />
            <TextField sx={{ width: 50, height: 45 }} id="outlined-basic" label="Qty" variant="outlined" />
        </Grid>
    )
}