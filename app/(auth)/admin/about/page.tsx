'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddAction from "./AddAction"
import { schema } from "./AboutSchema"
import { UploadButton } from "app/utils/uploadthing"
import Image from 'next/image';
type FormData = {
    aboutDescription: string,
    aboutTitlImageUrl: string,
    designerDetail: string,
    designerImageUrl: string,
    ourStoryDescription: string,
    ourStoryImageUrl: string
}

export default function AboutPage() {
    const [designerImageUrl, setDesignerImageUrl] = useState("")
    const [aboutTitleImageUrl, setAboutTitleImageUrl] = useState("")
    const [ourStoryImageUrl, setOurStoryImageUrl] = useState("")

    const addAbout = AddAction.bind(null, aboutTitleImageUrl, designerImageUrl, ourStoryImageUrl)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <Box
            component="form"
            ref={formRef}
            action={addAbout}
            sx={{ mt: 4 }}
        >
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                {errors.aboutDescription && <span>{errors.aboutDescription.message}</span>}
                <TextField id='outlined-basic' label="About Description" multiline variant='outlined' rows={5} sx={{width: '400px'}} {...register("aboutDescription")} />
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                <UploadButton
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        setAboutTitleImageUrl(res[0].url)
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                {aboutTitleImageUrl ?
                            <div>
                                <Image src={aboutTitleImageUrl} alt='Image Preview' width={500} height={300} />
                            </div> : null}
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                {errors.designerDetail && <span>{errors.designerDetail.message}</span>}
                <TextField id='outlined-basic' label="Designer Description" multiline variant='outlined' rows={5} sx={{width: '400px'}} {...register("designerDetail")} />
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                <UploadButton
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        setDesignerImageUrl(res[0].url)
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                {designerImageUrl ?
                            <div>
                                <Image src={designerImageUrl} alt='Image Preview' width={500} height={300} />
                            </div> : null}
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                {errors.ourStoryDescription && <span>{errors.ourStoryDescription.message}</span>}
                <TextField id='outlined-basic' label="Story Description" multiline variant='outlined' rows={5} sx={{width: '400px'}} {...register("ourStoryDescription")} />
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mb: 4}}>
                <UploadButton
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        setOurStoryImageUrl(res[0].url)
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                {ourStoryImageUrl ?
                            <div>
                                <Image src={ourStoryImageUrl} alt='Image Preview' width={500} height={300} />
                            </div> : null}
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={2} sx={{mt: 4}}>
                <Button variant='outlined' type='submit'>Send</Button>
            </Grid>
        </Box>
    )
}