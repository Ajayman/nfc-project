import { Grid } from "@mui/material";
import ProductItems from '@components/products'
import Pagination from '@components/pagintation';
import { fetchProductsPage } from "@app/lib/actions";

export default async function EditProduct({
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
                    <ProductItems type="Edit" currentPage={currentPage} query={query} />
                </Grid>
                <Pagination totalPages={totalPages}></Pagination>
            </>
        )
    }