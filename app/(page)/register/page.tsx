'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { registerSchema } from '@app/lib/schemas';
import { CreateUserAction } from '@app/lib/actions';
import { z } from 'zod';

type Inputs = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(registerSchema) });

    const processForm: SubmitHandler<Inputs> = async data => {
        const result = await CreateUserAction(data)
    }
    return (
        // <Box component="form" onSubmit={handleSubmit(submitData)}>
        <Box component="form" onSubmit={handleSubmit(processForm)} sx={{ mt: 4 }}>
            <Grid container justifyContent='center' sx={{ mb: 3 }}>
                <Typography variant="h3">
                    Sign Up
                </Typography>
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={1}>
                <Grid item>
                    <TextField id='outlined-basic' label="First Name" variant='outlined' {...register("firstName")} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label="Last Name" variant='outlined' {...register("lastName")} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label="Age" variant='outlined' {...register("age")} />
                    {errors.age && <p>{errors.age.message}</p>}
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label="Password" type='password' variant='outlined' {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                </Grid>
                {/* <Grid item>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    <TextField id='outlined-basic' label="Confirm Password" type='password' variant='outlined' {...register("confirmPassword")} />
                </Grid> */}
                <Grid item>
                    <Button variant='outlined' type='submit'>Sign Up</Button>
                </Grid>

                <Grid item>
                    <Link href={`/dashboardlogin`}>Already Have Account</Link>
                </Grid>
            </Grid>
        </Box>
    )
}