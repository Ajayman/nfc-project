// import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Search from 'app/components/Search';
import Product from '../components/product'
import SearchProducts from 'app/components/SearchProducts'
async function getProducts() {
    const res = await fetch(process.env.ROOT_URL + '/api/products')
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

export default async function Products() {
    const { products } = await getProducts();
    console.log('this is item '+ products);
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const response = await fetch('api/products');
    //         const products = await response.json();
    //         setProducts(products)
    //     }
    //     getProducts();
    // }, [])
    return (
        <main>
            {/* <Search getSearchResults={(results) => setProducts(results)} /> */}
            {/* <SearchProducts products={products} /> */}
            <Grid sx={{mt:4}} container spacing={2}>
                {products.map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={item.id}>
                        <Product id={item.id} title={item.title} imageSrc={item.imageSrc} price={item.price} />
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
