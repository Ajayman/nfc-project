'use client'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Link from 'next/link';
import Search from 'app/components/Search';
import SearchProducts from 'app/components/SearchProducts'
// async function getData(){
//     const res = await fetch('http://localhost:3000/api/products')
//     if(!res.ok){
//         throw new Error('Failed to fetch data')
//     }
//     return res.json()
// }

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('api/products');
            const products = await response.json();
            setProducts(products)
        }
        getProducts();
    }, [])
    return (
        <main>
            <Search getSearchResults={(results)=> setProducts(results)}/>
            <SearchProducts products={products} />
        </main >
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
        //         {products.map((item, key) => (
        //             < Grid xs={6} sm={4} md={3} key={item.id}>
        //                 <Link href={`/products/${item.id}`} key={item.id}>
        //                     <Product id={item.id} title={item.title} imageSrc={item.imageSrc} price={item.price} />
        //                 </Link>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Box >
    )
}
