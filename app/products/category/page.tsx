import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Product from 'app/components/product'
import 'react-multi-carousel/lib/styles.css'
import CategoryCarousel from "app/components/categoryCarousel";
import ProductCard from "@/app/components/FilterProducts";
export default async function Category({ searchParams }: { searchParams?: { query?: string } }) {
    const res = await fetch(process.env.ROOT_URL + `/api/products/category?query=${searchParams?.query}`)
    const result = await res.json();
    const filteredProduct = result.data;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ pb: 2, mt: 3 }}>
                <Link variant='h5' href='products/category' color='black' underline='hover'>Product Categories</Link>
            </Grid>
            <CategoryCarousel />
            <Grid container sx={{ mt: 3, mb: 2 }}>
                <Grid item sx={{ pb: 2 }}>
                    <Typography variant='h5'>{searchParams?.query}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {filteredProduct.map((item, key) => (
                    <ProductCard item={item} />
                ))}
            </Grid>
        </Box>
    )
}