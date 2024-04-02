'use client'
import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, InputBase, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

type FormData = {
    name: string;
    email: string;
    phoneNumber: string;
    comment: string;
}

export default function ContactPage() {
    const schema: ZodType<FormData> = z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        phoneNumber: z.string().min(7).max(20),
        comment: z.string().min(20).max(100)
    })
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const submitData = (data: FormData) => {
        console.log("IT worked", data)
    }
    return (
        <Box component="form" onSubmit={handleSubmit(submitData)}>
            <Grid container direction="column" alignContent="center" spacing={2}>
                <Grid>
                    {errors.name && <span>{errors.name.message}</span>}
                    <TextField id='outlined-basic' label="Name" variant='outlined' {...register("name")} />
                </Grid>
                <Grid>
                    {errors.email && <span>{errors.email.message}</span>}
                    <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
                </Grid>
                <Grid>
                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                    <TextField id='outlined-basic' label="Phone Number" variant='outlined' {...register("phoneNumber")} />
                </Grid>
                <Grid>
                    {errors.comment && <span>{errors.comment.message}</span>}
                    <TextField id='outlined-basic' label="Comment" variant='outlined' {...register("comment")} />
                </Grid>
                <Grid>
                    <Grid>
                        <Button variant='outlined' type='submit'>Send</Button>
                    </Grid>
                </Grid>

                <Grid container direction="column" alignContent="center">
                    <Grid textAlign="center">
                        <Typography variant='h3'>Contact Number</Typography>
                        <Typography variant='subtitle1'>Number: 9863662631</Typography>
                        <Typography variant='subtitle1'>Email: nina.fscollection@gmail.com</Typography>
                        <Typography variant='subtitle1'>Kamalbinayak-10, Bhaktapur</Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid textAlign="center">
                        <Typography variant='h3'>Subscribe us</Typography>
                        <Typography variant='subtitle1'>Be the first to know our notification on your email</Typography>
                        <Paper
                            component="form"
                            sx={{p: '2px 4px', display: 'flex', justifyItems: 'center'}}
                        >
                            <InputBase placeholder='Subscribe' />
                            <IconButton type='button'>
                            <ArrowForwardIosIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}