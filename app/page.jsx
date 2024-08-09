'use client'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import titleImage from '../public/title-image.svg'
import Image from 'next/image'
import Link from '@mui/material/Link'
import CategoryCarousel from './components/categoryCarousel'
import Product from './components/product'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from 'react'
import { readItem } from 'app/actions/readAction'
import { readCategory } from 'app/actions/readAction'
import {useRouter} from 'next/navigation'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categoryItems, setCategoryItem] = useState([])
  const [newProducts, setNewProducts] = useState([]);
  const [trendingProduct, setTrendingProducts] = useState([]);
  const [oldProduct, setOldProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getAllItem = async () => {
      const itemData = await readItem()
      setProducts(itemData);
      setNewProducts(itemData.filter((item) => item.productType == "New"))
      setTrendingProducts(itemData.filter((item) => item.productType == "Trending"))
      setOldProducts(itemData.filter((item) => item.productType == "Old Stock"))
    };
    getAllItem()
  }, []);
  useEffect(() => {
    const getAllCategory = async () => {
      const category = await readCategory()
      setCategoryItem(category);
    }
    getAllCategory();
  }, [])
  const handleCategoryFromChild = (data)=>{
    router.push(`products/category?name=${data}`);   
  }
  console.log(products);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h1' fontWeight='bold'>Let’s enjoy with
            Nina’s Fashion</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent='flex-end'>
            <Image src={titleImage} alt='Title Image' width={450} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ pb: 2 }}>
        <Link variant='h5' href='/category' color='black' underline='hover'>Categories</Link>
      </Grid>
      <CategoryCarousel categories={categoryItems}  sendCategoryToParent={handleCategoryFromChild}/>
      <Grid container sx={{ mt: 3, mb: 2 }}>
        <Grid item sx={{ pb: 2 }}>
          <Typography variant='h5'>New Items</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {newProducts && newProducts.map((item, key) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ mt: 3, mb: 2 }}>
        <Grid item sx={{ pb: 2 }}>
          <Typography variant='h5'>Trending Products</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {trendingProduct && trendingProduct.map((item, key) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ mt: 3, mb: 2 }}>
        <Grid item sx={{ pb: 2 }}>
          <Typography variant='h5'>Old Products</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {oldProduct && oldProduct.map((item, key) => (
          <Grid item xs={6} sm={4} md={3} key={item.id}>
            <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
          </Grid>
        ))}
      </Grid>
    </Box >
  );
}
