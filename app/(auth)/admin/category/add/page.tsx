'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddAction from "./AddAction"
import { schema } from "./CategorySchema"
import { UploadButton } from "app/utils/uploadthing";
import Image from 'next/image';
type FormData = {
    name: string,
    imageUrl: string
}

export default function CategoryAdd() {
    const [imageUrl, setImageUrl] = useState("")
    const addImage = AddAction.bind(null, imageUrl)
    const form = useForm<FormData>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState: { errors } } = form;
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <Box
            component="form"
            ref={formRef}
            // onSubmit={handleSubmit(() => formRef.current?.submit())}
            action={addImage}
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
                    {imageUrl.length ?
                        <div>
                            <Image src={imageUrl} alt='Image Preview' width={500} height={300} />
                        </div> : null}
                </Grid>
                <Grid>
                    <Button variant='outlined' type='submit'>Send</Button>
                </Grid>
            </Grid>
        </Box>
    )
}