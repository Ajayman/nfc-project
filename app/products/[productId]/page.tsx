import React from "react";
import { Suspense } from 'react';
import { Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ImageSwiper from "@/app/components/ImageSwiper";
import ProductDetailContent from "@/app/components/ProductDetailContent";
import DetailDescription from "@/app/components/DetailDescription";
import { Typography } from "@mui/material";
import { readFiltered } from "@/app/lib/actions";
import FilterProducts from "@/app/components/FilterProducts";

async function fetchData(productId: string) {
    try {
        const res = await fetch(process.env.ROOT_URL + `/api/products/${productId}`, {
            method: "GET",
            cache: "force-cache"
        });
        console.log("This is an exapmple" + res.url);
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
    const result = await fetchData(productId);
    const product = result.data
    if (!product) {
        notFound();
    }
    const filterProduct = await readFiltered();
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Suspense fallback={"Loading..."}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={12} md={7} display="flex" justifyContent="center" flexDirection="column">
                        <ImageSwiper />
                    </Grid>
                    <ProductDetailContent item={product} />
                    <DetailDescription display='xs-block hidden' />
                </Grid>
            </Suspense>
            <Suspense>
                <Grid sx={{ mt: 4 }} container spacing={2}>
                    <Grid xs={12}>
                        <Typography variant="h4">
                            You may also like
                        </Typography>
                    </Grid>
                    {filterProduct.map((item, key) => (
                        <Grid xs={3} key={item.id}>
                            <FilterProducts item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Suspense>
        </Box >
    )
}

export const metadata: Metadata = {
    title: 'Detail'
}