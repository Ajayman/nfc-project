"use client"
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Product from '../components/product'
import { readItem } from 'app/actions/readAction';

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getAllItem = async () => {
            const itemData = await readItem();
            setProducts(itemData);
        };
        getAllItem()
    }, []);
    // const res = await fetch(process.env.ROOT_URL + "/api/searchProduct");
    // console.log(res);
    // const products = await res.json();
    // console.log(products)
    return (
        <Grid sx={{ mt: 4 }} container spacing={2}>
            {products.map((item, key) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <Product id={item.id} title={item.title} imageUrl={item.imageUrl} price={item.price} />
                </Grid>
            ))}
        </Grid>
    )
}
