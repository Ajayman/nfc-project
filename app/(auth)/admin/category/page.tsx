'use client'
import { useState } from "react";
import { Box, Button } from "@mui/material";
import useSWR from "swr";
import Image from "next/image";
import { useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { deleteCategoryAction } from "@app/lib/actions";
import { editCategoryRedirect } from "@app/lib/actions";

function editCategory(cat_id: String){
    editCategoryRedirect(cat_id)
}

function deleteCategory(cat_id: String){
    deleteCategoryAction(cat_id)
}

const fetcher = url => fetch(url).then(r => r.json())
export default function CategoryList() {
    const { data, isLoading, error } = useSWR('/api/categories', fetcher)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        if (data) {
            setCategories(data.data)
        }
    })
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <Grid container spacing={2}>
            {categories.map((category) => (
                <Grid xs={2} sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textDecoration: "none",
                    // color: {searchParams.get("query")==category.name ? 'grey' : 'black'}
                }}
                    // onClick={() => {
                    //   handleCarousel(category.name)
                    // }}
                    key={category.name}>
                    <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={80}
                        height={80}
                    />
                    <button>{category.name}</button>
                    <div>
                        <Button onClick={() => editCategory(category.id)} size='small' variant='outlined' color='success'>Edit</Button>
                        <Button onClick={() => deleteCategory(category.id)} size='small' variant='outlined' color='error'>Delete</Button>
                    </div>
                </Grid>
            ))}
        </Grid>
    )
}