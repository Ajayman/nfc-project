"use client"
import { React, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box'
import Product from '../components/product'
import Link from 'next/link';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const fetchDataFromApi = async() => {
        try{
            setLoading(true);
            const response = await fetch("/api/products", {
                headers: {
                    Accept: "application/json",
                    method: "GET"
                }
            })
            if(response){
                const data = await response.json();
                console.log(data);
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }
    return (
        <button onClick={fetchDataFromApi}>Click Me</button>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
        //         {fetchDataFromApi.map((item, key) => (
        //             < Grid xs={6} sm={4} md={3} key={item.id}>
        //                 <Link href={`/products/${item.id}`} key={item.id}>
        //                     <Product title={item.title} imageSrc={item.imageSrc} price={item.price} />
        //                 </Link>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Box >
    )
}
