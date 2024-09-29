'use client'
import React from 'react';
import { useState } from 'react';
import { Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";
import Button from '@mui/material/Button';
import ChooseSize from "app/components/Variant";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import ProductRating from "@/app/components/productRating"
import { Product } from '@prisma/client';
import ChooseVariant from 'app/components/Variant';

export default function ProductDetailContent({ item }: Product) {
    const [product, setProduct] = useState(item);
    console.log(product)
    const [color, setColor] = React.useState<string | null>("");
    const [size, setSize] = React.useState<string | null>("");

    const handleColor = (
        event: React.MouseEvent<HTMLElement>,
        newColor: string | null,
    ) => {
        setColor(newColor);
    };

    const handleSize = (
        event: React.MouseEvent<HTMLElement>,
        newSize: string | null
    ) => {
        setSize(newSize)
    }
    return (
        <Grid xs={12} md={5} sx={{ height: '400' }}>
            <Chip label={product.category} />
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid xs={6}>
                    <Typography variant="h4">
                        {product.name}
                    </Typography>
                </Grid>
                <Grid xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button size="small" variant="outlined" startIcon={<FavoriteBorderOutlined />}>
                        Add to Wishlist
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{ alignItems: 'center' }}>
                <ProductRating rating={product.rating} />
                <Typography variant='caption' color='textSecondary'>
                    ({product.rating}) 1.2k Reviews
                </Typography>
            </Grid>

            <Typography variant="h6">
                {product.description}
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant='h4'>
                    <span className='line-through text-sm text-slate-500'>Nrs. {product.price}</span> <span>Nrs. {product.discountedPrice}</span>
                </Typography>
            </Box>
            <hr />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Typography variant="h6">
                    Color {color}
                </Typography>
                <ToggleButtonGroup
                    value={color}
                    exclusive
                    onChange={handleColor}
                    aria-label="color select"
                    size='large'
                >
                    <ToggleButton value="Red" aria-label="red">
                        <Button variant="contained" color='warning' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                    <ToggleButton value="Green" aria-label="green">
                        <Button variant="contained" color='success' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                    <ToggleButton value="Blue" aria-label="blue">
                        <Button variant="contained" color='primary' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography variant="h6">
                    Size {size}
                </Typography>
                <ToggleButtonGroup
                    value={size}
                    exclusive
                    onChange={handleSize}
                    aria-label="size select"
                    size='large'
                >
                    <ToggleButton value="Small" aria-label="small">
                        S
                    </ToggleButton>
                    <ToggleButton value="Medium" aria-label="medium">
                        M
                    </ToggleButton>
                    <ToggleButton value="Large" aria-label="large">
                        L
                    </ToggleButton>
                    <ToggleButton value="Extra Large" aria-label="extra large">
                        XL
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {/* <ChooseVariant type="Color" /> */}
            <Grid container sx={{ mt: 3, display: 'flex', gap: 5 }}>
                <Button size="large" variant='contained' sx={{ flexGrow: '1' }}>Add To Cart</Button>
                <Button variant='outlined' color='success' sx={{ flexGrow: '1' }}>Buy Now</Button>
            </Grid>
        </Grid>
    )
}