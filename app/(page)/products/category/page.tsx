import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import 'react-multi-carousel/lib/styles.css'
import CategoryCarousel from "app/components/categoryCarousel";
import ProductCard from "@app/components/FilterProducts";
import { fetchCategoryProduct } from "@app/lib/actions";
export default async function Category({ searchParams }: { searchParams?: { query?: string } }) {
    try {
        const res = await fetch(process.env.ROOT_URL + `/api/products/category?query=${searchParams?.query}`, {next: {revalidate: 3600 }});
        // const filteredProduct = await fetchCategoryProduct(searchParams?.query)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const result = await res.json();
        console.log('Data fetched successfully:', result);
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
                        <Grid item xs={3}>
                            <ProductCard item={item} key={item.id} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null; // Handle the error (e.g., return null or an empty object)
    }
}