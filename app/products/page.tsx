import Grid from '@mui/material/Grid';
import Product from '../components/product'
import { readItem } from 'app/lib/actions';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: 'Products'
}

export default async function Products() {
    const products = await readItem()
    return (
        <Grid sx={{ mt: 4 }} container spacing={2}>
            {products.map((item, key) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
                </Grid>
            ))}
        </Grid>

    )
}
