import { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Product from '../../components/product'
import { readItem } from '@/app/lib/actions';

export default async function SearchProducts({ searchParams }: {searchParams?: {query?:string}}) {
    // const query = searchParams?.query || '';
    const res = await fetch(process.env.ROOT_URL + `/api/searchProduct?query=${searchParams?.query}`);
    const result = await res.json();
    const products = result.data;
    return (
        <Grid sx={{ mt: 4 }} container spacing={2}>
            <Suspense fallback={"Loading...."}>
                {products.map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={item.id}>
                        <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
                    </Grid>
                ))}
            </Suspense>
        </Grid>
    )
}
