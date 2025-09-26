'use client'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddAction from "./AddAction"
import { schema } from "@app/schemas/ProductSchema"
import { useFormState } from 'react-dom';
import { UploadButton } from "app/utils/uploadthing";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Image from 'next/image';
import QuillEditor from '@components/quillEditor';

type FormData = {
    name: string,
    imageKey: string,
    imageUrl: string[],
    price: string,
    discountedPrice: string,
    title: string,
    shortDescription: string,
    longDescription: string,
    category: string,
    productType: string
}

export default function AdminPage() {
    const [imageUrl, setImageUrl] = useState([""])
    const [state, formAction] = useFormState(AddAction, {
        message: ""
    })
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([""]);
    const [longDescriptionValue, setLongDescriptionValue] = useState("");
    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch("/api/categories", { method: "GET", headers: { "Content-Type": "application/json" } })
                const data = await res.json()
                const categories = data.data.map(obj => obj.name)
                setCategories(categories);
            } catch (error) {
                console.log(error)
            }
        };
        fetchCategory()
    }, [""]);
    const addUser = AddAction.bind(null, imageUrl)
    const { register, control,setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    // const {register, handleSubmit, control, formState: {errors}} = useForm<FormData>();
    // const onSubmit: SubmitHandler<FormData> = data => console.log(data); Its correct
    const formRef = useRef<HTMLFormElement>(null)
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const [productType, setProductType] = useState("");
    const handleProductTypeChange = (event: SelectChangeEvent) => {
        setProductType(event.target.value as string);
    };
    return (
        <>
            <Box
                component="form"
                ref={formRef}
                // onSubmit={handleSubmit(onSubmit)}
                action={addUser}
                sx={{ mt: 4 }}
            >
                <Grid container direction="column" alignContent="center" spacing={2}>
                    <Grid>
                        {errors.name && <span>{errors.name.message}</span>}
                        <TextField id='outlined-basic' label="Name" variant='outlined' {...register("name")} />
                    </Grid>
                    <Grid>
                        <UploadButton
                            endpoint='imageUploader'
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                const urlList = res.reduce((url, obj) => {
                                    url.push(obj.url)
                                    return url
                                }, [])
                                setImageUrl(urlList)
                                alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        {imageUrl.length ?
                            <div>
                                <Image src={imageUrl[0]} alt='Image Preview' width={500} height={300} />
                            </div> : null}
                    </Grid>
                    <Grid>
                        {errors.price && <span>{errors.price.message}</span>}
                        <TextField id='outlined-basic' label="Price" variant='outlined' {...register("price")} />
                    </Grid>
                    <Grid>
                        {errors.discountedPrice && <span>{errors.discountedPrice.message}</span>}
                        <TextField id='outlined-basic' label="Discount Price" variant='outlined' {...register("discountedPrice")} />
                    </Grid>
                    <Grid>
                        {errors.title && <span>{errors.title.message}</span>}
                        <TextField id='outlined-basic' label="title" variant='outlined' {...register("title")} />
                    </Grid>
                    <Grid>
                        {errors.shortDescription && <span>{errors.shortDescription.message}</span>}
                        <TextField id='outlined-basic' label="Short Description" variant='outlined' {...register("shortDescription")} />
                    </Grid>
                    <Grid>
                        {errors.longDescription && <span>{errors.longDescription.message}</span>}
                        {/* Hidden input to capture longDescription value */}
                        <input 
                            type="hidden" 
                            name="longDescription" 
                            value={longDescriptionValue}
                        />
                        <Controller
                            name="longDescription"
                            control={control}
                            rules={{ required: "Long Description is required" }}
                            render={({ field }) => (
                                <QuillEditor value={field.value || ""} 
                                onChange={(value) => {
                                    console.log("Controller onChange:", value); 
                                    field.onChange(value);
                                    setLongDescriptionValue(value); // Update hidden input
                                    setValue("longDescription", value); // Update form state
                                }} />
                            )}
                            defaultValue='Item Detail ** Material(pointwise) ** About Product(Pointwise)'
                        />
                    </Grid>
                    <Grid>
                        <FormControl fullWidth>
                            {errors.category && <span>{errors.category.message}</span>}
                            {/* <TextField id='outlined-basic' label="Category" variant='outlined' {...register("category")} /> */}
                            <InputLabel id="select-categoryId">Category</InputLabel>
                            <Select
                                labelId='select-categoryId'
                                id='select-category'
                                value={category}
                                {...register("category")}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                {categories.map((cat) =>
                                    <MenuItem value={cat} key={cat.id}>{cat}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl fullWidth>
                            {errors.productType && <span>{errors.productType.message}</span>}
                            {/* <TextField id='outlined-basic' label="description" variant='outlined' {...register("productType")} /> */}
                            <InputLabel id="select-productTypeId">Product Type</InputLabel>
                            <Select
                                labelId='select-productTypeId'
                                id='select-productType'
                                // defaultValue={productType}
                                {...register("productType")}
                                label="productType"
                                onChange={handleProductTypeChange}
                            >
                                <MenuItem value={"New"}>New</MenuItem>
                                <MenuItem value={"Trending"}>Trending</MenuItem>
                                <MenuItem value={"Old Stock"}>Old Stock</MenuItem>
                                <MenuItem value={"Discounted"}>Discounted</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button variant='outlined' type='submit'>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}