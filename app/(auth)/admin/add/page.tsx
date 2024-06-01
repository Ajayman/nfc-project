'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddAction from "./AddAction"
import { schema } from "./ProductSchema"
import { useFormState } from 'react-dom';
import { UploadButton } from "app/utils/uploadthing"
type FormData = {
    name: string,
    imageKey: string,
    imageUrl: string
    price: string,
    title: string,
    description: string
}

export default function AdminPage() {
    const [imageUrl, setImageUrl] = useState("")
    // const [state, formAction] = useFormState(AddAction, {
    //     message: ""
    // })
    const addUser = AddAction.bind(null, imageUrl)
    const form = useForm<FormData>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState: { errors } } = form;
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <>
            <Box
                component="form"
                ref={formRef}
                // onSubmit={handleSubmit(() => formRef.current?.submit())}
                action={addUser}
                sx={{mt:4}}
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
                                setImageUrl(res[0].url)
                                alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </Grid>
                    <Grid>
                        {errors.price && <span>{errors.price.message}</span>}
                        <TextField id='outlined-basic' label="Price" variant='outlined' {...register("price")} />
                    </Grid>
                    <Grid>
                        {errors.title && <span>{errors.title.message}</span>}
                        <TextField id='outlined-basic' label="title" variant='outlined' {...register("title")} />
                    </Grid>
                    <Grid>
                        {errors.description && <span>{errors.description.message}</span>}
                        <TextField id='outlined-basic' label="description" variant='outlined' {...register("description")} />
                    </Grid>
                    <Grid>
                        <Button variant='outlined' type='submit'>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}