import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Product from '../components/product'
import Link from 'next/link';

async function getData(){
    const res = await fetch('http://localhost:3000/api/products')
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Page() {
    const {products} = await getData();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
                {products.map((item, key) => (
                    < Grid xs={6} sm={4} md={3} key={item.id}>
                        <Link href={`/products/${item.id}`} key={item.id}>
                            <Product title={item.title} imageSrc={item.imageSrc} price={item.price} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}
