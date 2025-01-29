import Grid from '@mui/material/Grid';
import ProductItems from '@components/products'
import { fetchProductsPage, fetchProducts } from 'app/lib/actions';
import Pagination from '@components/pagintation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';

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
        <Suspense fallback={<Loading />}>
            <Grid sx={{ mt: 4 }} container spacing={2}>
                <ProductItems type="Buy" currentPage={currentPage} query={query} />
            </Grid>
            <Pagination totalPages={totalPages}></Pagination>
        </Suspense>
    )
}
