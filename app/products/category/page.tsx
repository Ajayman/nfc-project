"use client"
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Product from 'app/components/product'
import 'react-multi-carousel/lib/styles.css'
import CategoryCarousel from "app/components/categoryCarousel";
import { readItem } from 'app/actions/readAction'
import { readCategory } from 'app/actions/readAction'

export default function Category() {
    const [filterProduct, setFilterProduct] = useState([])
    const [categoryItems, setCategoryItem] = useState([])
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("")
    useEffect(() => {
        const getAllItem = async () => {
            const itemData = await readItem()
            setProducts(itemData);
        };
        getAllItem()
    }, []);
    useEffect(()=> {
        const getAllCategory = async()=> {
          const category = await readCategory()
          setCategoryItem(category);
        }
        getAllCategory();
      },[])

      const handleCategoryFromChild = (cat)=>{
        const newItems = products.filter((newVal)=> newVal.category == cat)
        setCategory(cat);
        setFilterProduct(newItems)
      }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ pb: 2, mt: 3 }}>
                <Link variant='h5' href='products/category' color='black' underline='hover'>Product Categories</Link>
            </Grid>
            <CategoryCarousel categories={categoryItems} sendCategoryToParent={handleCategoryFromChild}/>
            <Grid container sx={{ mt: 3, mb: 2 }}>
                <Grid item sx={{ pb: 2 }}>
                    <Typography variant='h5'>{category}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {products && filterProduct.map((item, key) => (
                    <Grid item xs={6} sm={4} md={3} key={item.id}>
                        <Product id={item.id} name={item.name} title={item.title} imageUrl={item.imageUrl} price={item.price} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}