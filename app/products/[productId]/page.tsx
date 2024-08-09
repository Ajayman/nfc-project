import React from "react";
import { Suspense } from 'react';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ChooseSize from "app/components/Variant";
import { notFound } from "next/navigation";
async function fetchData(productId) {
    try {
        const res = await fetch(process.env.ROOT_URL + `/api/products/${productId}`, {
            method: "GET",
            cache: "force-cache"
        });
        console.log(res);
        if (!res.ok) {
            throw new Error('Failed to fetch data');

        }
        return res.json();
    } catch (error) {
        console.log(error.message)
    }
}

export default async function ProductDetail({ params }: { params: { productId: string } }) {
    const { productId } = params;
    const product = await fetchData(productId);
    if (!product) {
        notFound();
    }
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Suspense fallback={"Loading..."}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={7} display="flex" justifyContent="center" flexDirection="column">
                        {/* <SwiperImage /> */}
                    </Grid>
                    <Grid xs={5}>
                        <Typography variant="h3">
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle2">
                            Be the first to review this product
                        </Typography>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant='h4'>
                                Nrs. {product.price}
                            </Typography>
                            <Box>
                                <Typography variant='h6'>
                                    In Stock
                                </Typography>
                                <Typography variant='subtitle1'>
                                    SKU: #1234
                                </Typography>
                            </Box>
                        </Box>
                        <hr />
                        <ChooseSize type="Size" />
                        <ChooseSize type="Color" />
                        <Typography variant="h6">Qty</Typography>
                        <TextField sx={{ width: 40, height: 45 }} id="outlined-basic" label="1" variant="outlined" />
                        <Stack sx={{ mt: 3 }} spacing={4} direction='row'>
                            <Button size="large" variant='contained'>Add To Cart</Button>
                        </Stack>
                        <Button color="secondary" startIcon={<FavoriteIcon />}>Add to Favourite Icon</Button>
                        <Button color="secondary" startIcon={<CompareIcon />}>Compare With Other Product</Button>
                    </Grid>
                </Grid>
            </Suspense>
        </Box >
    )
}
