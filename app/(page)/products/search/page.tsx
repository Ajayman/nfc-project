import { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import ProductItems from '@/app/components/products'
import Pagination from '@/app/components/pagintation';
import { fetchProductsPage } from '@/app/lib/actions';

export default async function SearchProducts({ searchParams }: { searchParams?: { query?: string, page?: string } }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPage(query);
    return (
        <>
            <Grid sx={{ mt: 4 }} container spacing={2}>
                <ProductItems currentPage={currentPage} query={query} />
            </Grid>
            <Pagination totalPages={totalPages} />
        </>

    )
}
