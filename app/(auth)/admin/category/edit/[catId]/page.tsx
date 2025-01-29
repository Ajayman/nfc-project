'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { editCategoryAction } from '@app/lib/actions';
import { schema } from "../../add/CategorySchema"
import { UploadButton } from "app/utils/uploadthing";
import Image from 'next/image';
import useSWR from 'swr';
type FormData = {
    name: string,
    imageUrl: string
}
const fetcher = url => fetch(url).then(r => r.json())
export default function CategoryEdit({ params }: { params: { catId: string } }) {
    const { catId } = params;
    const { data, isLoading, error } = useSWR(`/api/admin/category/${catId}`, fetcher);
    const [categoryName, setCategoryName] = useState();
    const [imageUrl, setImageUrl] = useState("");
    // useEffect(() => {
    //     if (data) {
    //         setCategoryName(data.data.name)
    //         // setImageUrl(data.data.imageUrl)
    //     }
    // });

    const editCategory = editCategoryAction.bind(null, imageUrl, catId)
    const form = useForm<FormData>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState: { errors } } = form;
    const formRef = useRef<HTMLFormElement>(null);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <Box
            component="form"
            ref={formRef}
            // onSubmit={handleSubmit(() => formRef.current?.submit())}
            action={editCategory}
            sx={{ mt: 4 }}
        >
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
                            // const urlList = res.reduce((url, obj) => {
                            //     url.push(obj.url)
                            //     return url
                            // }, [])
                            const url = res[0].url
                            setImageUrl(url)
                            console.log(imageUrl)
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    {
                        <div>
                            <Image src={imageUrl || data.data.imageUrl} alt='Image Preview' width={500} height={300} />
                        </div>
                    }

                </Grid>
                <Grid>
                    <Button variant='outlined' type='submit'>Send</Button>
                </Grid>
            </Grid>
        </Box>
    )
}