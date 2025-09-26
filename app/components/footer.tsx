'use client'
import React, { useRef, useState } from 'react'
import Grid from "@mui/material/Unstable_Grid2"
import { Typography } from "@mui/material"
import Link from "@mui/material/Link"
import { Box, TextField, Button } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { formContactAction } from '@app/lib/actions'
import { contactSchema } from '@app/lib/schemas'
import ContactForm from './contactForm'

type FormData = {
    name: string,
    phoneNumber: string,
    message: string
}
const schema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    message: z.string()
})

export default function footer() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <Grid container spacing={2} sx={{ mt: 3, p: 3, background: '#3b5051' }}>
            <Grid xs={6}>
                <Box component="section" display="flex" sx={{ alignItems: 'center', mb: 3 }}>
                    <img src="Nina-logo.jpg" width="80px" alt="ninafc-logo" />
                    <Typography variant="h4" sx={{ color: '#e9e0e5' }}>
                        Nina Fashion Collection
                    </Typography>
                </Box>
                <Box component="section">
                    <Typography variant="h6" sx={{ color: '#e9e0e5' }}>
                        Contact Us or message us on
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#e9e0e5', mb: 2 }}>
                        +977 9741807557, +977 9863662631
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#e9e0e5', mb: 2 }}>
                        nina.fscollection@gmail.com
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#e9e0e5', mb: 2 }}>
                        Garud Kunda Road, Kamalbinayak, Bhaktapur
                    </Typography>
                    <Link href="https://www.facebook.com/ninafscollection"><FacebookIcon fontSize="large" color="action" sx={{ mr: 2 }} /></Link>
                    <Link href="https://www.tiktok.com/@ninafashioncollection"><img src="tiktok-logo-thin.svg" alt="" height="35px" /></Link>
                </Box>
            </Grid>
            <Grid xs={6}>
                <ContactForm />
            </Grid>
            <Grid xs={12}>
                <hr />
            </Grid>
            <Grid xs={12} sx={{display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ color: '#e9e0e5' }}>
                    &copy; Copyright 2025 Nina Fashion Collection
                </Typography>
            </Grid>
        </Grid>
    )
}