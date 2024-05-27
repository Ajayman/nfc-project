'use client'
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, TextField, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import Link from 'next/link';
import {schema} from './registerSchema'
import createUserAction from "./registerAction"
import {useFormState} from "react-dom"
type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
}
export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const submitData = (data: FormData) => {
        console.log("IT worked", data)
    }
    const [state, formAction] = useFormState(createUserAction, {message: ""})
    return (
        // <Box component="form" onSubmit={handleSubmit(submitData)}>
        <Box component="form" action={formAction} sx={{mt: 4}}>
            <Grid container justifyContent='center' sx={{mb:3}}>
                <Typography variant="h3">
                    Sign Up
                </Typography>
            </Grid>
            <Grid container direction="column" alignContent="center" spacing={1}>
                <Grid item>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                    <TextField id='outlined-basic' label="First Name" variant='outlined' {...register("firstName")} />
                </Grid>
                <Grid item>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                    <TextField id='outlined-basic' label="Last Name" variant='outlined' {...register("lastName")} />
                </Grid>
                <Grid item>
                    {errors.email && <span>{errors.email.message}</span>}
                    <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
                </Grid>
                <Grid item>
                    {errors.age && <span>{errors.age.message}</span>}
                    <TextField id='outlined-basic' type='number' label="Age" variant='outlined' {...register("age", { valueAsNumber: true })} />
                </Grid>
                <Grid item>
                    {errors.password && <span>{errors.password.message}</span>}
                    <TextField id='outlined-basic' label="Password" type='password' variant='outlined' {...register("password")} />
                </Grid>
                {/* <Grid item>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    <TextField id='outlined-basic' label="Confirm Password" type='password' variant='outlined' {...register("confirmPassword")} />
                </Grid> */}
                <Grid item>
                    <Button variant='outlined' type='submit'>Sign Up</Button>
                </Grid>
                
                <Grid item>
                    <Link href={`/login`}>Already Have Account</Link>
                </Grid>
            </Grid>
        </Box>
    )
}
// "use client"
// import {useFormState} from "react-dom"
// import createUserAction from "./registerAction"
// export default function SignUp(){
//     const [error, formAction] = useFormState(createUserAction, undefined)
//     // async function signup(formData: FormData){
//     //     "use server";

//     //     //Get data off form
//     //     const email = formData.get("email");
//     //     const password = formData.get("password")

//     //     //send to our api route
//     //     const res = await fetch("http://localhost:3000/api/signup",{
//     //         method: "POST",
//     //         headers:{
//     //             Accept: "application/json",
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({email, password})
//     //     });
//     //     const content = await res.json();
//     //     console.log(content);

//     //     //Redirect to login
//     //     if(res.ok){
//     //         redirect("/login")
//     //     }
//     // }
//     return(
//         <div>
//             <h1>Sign Up</h1>
//             <form action={formAction}>
//                 <input type="email" name="email" />
//                 <input type="password" name="password" />
//                 <button type="submit">Sign Up</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     )
// }