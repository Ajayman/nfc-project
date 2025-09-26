import React from "react";
import { Suspense } from 'react';
import { Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ImageSwiper from "@app/components/ImageSwiper";
import ProductDetailContent from "@app/components/ProductDetailContent";
import DetailDescription from "@app/components/DetailDescription";
import { Typography } from "@mui/material";
import { fetchProductType } from "@app/lib/actions";
import ProductCard from "@app/components/FilterProducts";
import prisma from "@app/lib/prisma";

async function fetchData(productId: string) {
    try{
        const result = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        return result
    }catch(error){
        return error
    }
}
export default async function ProductDetail({ params }: { params: { productId: string } }) {
    const { productId } = params;
    const product = await fetchData(productId);
    const productItem = {
        id: product.id,
        name: product.name,
        imageKey: product.imageKey,
        imageUrl: product.imageUrl,
        price: product.price,
        discountedPrice: product.discountedPrice,
        title: product.title,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        category: product.category,
        productType: product.productType
    } 
    // if (!product) {
    //     notFound();
    // }
    const filterProduct = await fetchProductType('New');
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Suspense fallback={"Loading..."}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid xs={12} md={7} display="flex" justifyContent="center" flexDirection="column">
                        <ImageSwiper imageList={productItem.imageUrl} />
                    </Grid>
                    <ProductDetailContent item={productItem} />
                    {/* <DetailDescription display='xs-block hidden' /> */}
                </Grid>
            </Suspense>
            <Suspense fallback={"Loading..."}>
                <Grid sx={{ mt: 4 }} container spacing={2}>
                    <Grid xs={12}>
                        <Typography variant="h4">
                            You may also like
                        </Typography>
                    </Grid>
                    {filterProduct.map((item, i) => (
                        <Grid xs={3} key={i}>
                            <ProductCard item={item} />
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