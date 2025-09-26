'use client'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { schema } from "@app/schemas/ProductSchema"
import { editProductAction } from "@app/lib/actions"
import { UploadButton } from 'app/utils/uploadthing';
import useSWR from 'swr'
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
const fetcher = url => fetch(url).then(r => r.json())
export default function EditProduct({ params }: { params: { productId: string } }) {
    const { productId } = params;
    const { data, isLoading, error} = useSWR(`/api/products/${productId}`, fetcher)
    const { data: categoryList } = useSWR('/api/categories', fetcher)
    const [categories, setCategories] = useState([{}]);
    const [imageUrl, setImageUrl] = useState([""]);
    const [longDescriptionValue, setLongDescriptionValue] = useState("");
    useEffect(()=> {
        if(categoryList){
            const categories = categoryList.data.map(obj=>obj.name)
            setCategories(categories)
        }
    }, [categoryList])
    // useEffect(()=>{
    //     if(data){
    //         setImageUrl(data.data.imageUrl)
    //     }
    // })
    // const [state, formAction] = useFormState(editProductAction, {
    //     message: ""
    // })
    const [category, setCategory] = useState("");
    const editProduct = editProductAction.bind(null,imageUrl, productId)
    const { register,setValue, control,  formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const formRef = useRef<HTMLFormElement>(null)
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const [productType, setProductType] = useState("");
    const handleProductTypeChange = (event: SelectChangeEvent) => {
        setProductType(event.target.value as string);
    };
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <Box
            component="form"
            ref={formRef}
            // onSubmit={handleSubmit(() => formRef.current?.submit())}
            action={editProduct}
            sx={{ mt: 4 }}
        >
            {/* <pre>{data.data}</pre> */}
            <Grid container direction="column" alignContent="center" spacing={2}>
                <Grid>
                    {errors.name && <span>{errors.name.message}</span>}
                    <TextField id='outlined-basic' label="Name" variant='outlined' defaultValue={data.data.name} {...register("name")} />
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
                            console.log(urlList)
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
                            <Image src={imageUrl[0] || data.data.imageUrl[0]} alt='Image Preview' width={500} height={300} />
                        </div> : null}
                </Grid>
                <Grid>
                    {errors.price && <span>{errors.price.message}</span>}
                    <TextField id='outlined-basic' label="Price" variant='outlined' defaultValue={data.data.price} {...register("price")} />
                </Grid>
                <Grid>
                    {errors.discountedPrice && <span>{errors.discountedPrice.message}</span>}
                    <TextField id='outlined-basic' label="Discount Price" variant='outlined' defaultValue={data.data.discountedPrice} {...register("discountedPrice")} />
                </Grid>
                <Grid>
                    {errors.title && <span>{errors.title.message}</span>}
                    <TextField id='outlined-basic' label="title" variant='outlined' defaultValue={data.data.title} {...register("title")}/>
                </Grid>
                <Grid>
                        {errors.shortDescription && <span>{errors.shortDescription.message}</span>}
                        <TextField id='outlined-basic' label="Short Description" variant='outlined' defaultValue={data.data.shortDescription} {...register("shortDescription")} />
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
                            defaultValue={data.data.longDescription}
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
                            defaultValue={data.data.category}
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
                            defaultValue={data.data.productType}
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
                    <Button variant='outlined' type='submit'>Update</Button>
                </Grid>
            </Grid>
        </Box>
    )
}