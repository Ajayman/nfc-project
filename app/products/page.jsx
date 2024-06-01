// import { useState, useEffect } from 'react'
'use client'
import Grid from '@mui/material/Grid';
import Search from 'app/components/Search';
import Product from '../components/product'
import SearchProducts from 'app/components/SearchProducts'
import { useEffect, useState } from 'react'
import {readItem} from 'app/actions/readAction'

export default function Products() {
    const [products, setProducts] = useState([]);
  useEffect(() => {
    const  getAllItem = async()=> {
     const itemData = await readItem()
     console.log(itemData);
     setProducts(itemData);
    };
    getAllItem()
  }, []);
    return (
        <main>
            {/* <Search getSearchResults={(results) => setProducts(results)} /> */}
            {/* <SearchProducts products={products} /> */}
            <Grid sx={{mt:4}} container spacing={2}>
                {products.map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={item.id}>
                        <Product id={item.id} title={item.title} imageUrl={item.imageUrl} price={item.price} />
                    </Grid>
                ))}
            </Grid>
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
