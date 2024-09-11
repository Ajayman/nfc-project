import Grid from '@mui/material/Grid';
import ProductItems from '../components/products'
import { fetchProductsPage, fetchProducts } from 'app/lib/actions';
import { Metadata } from 'next';
import Pagination from '../components/pagintation';

export const metadata: Metadata = {
    title: 'Products'
}

export default async function Products({
    searchParams
}: {
    searchParams?: {
        query?: string,
        page?: string
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPage(query);
    return (
        <>
            <Grid sx={{ mt: 4 }} container spacing={2}>
                <ProductItems currentPage={currentPage} query={query} />
            </Grid>
            <Pagination totalPages={totalPages}></Pagination>
        </>
    )
}
 