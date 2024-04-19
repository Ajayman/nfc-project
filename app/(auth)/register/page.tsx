// 'use client'
// import React from 'react';
// import { ZodType, z } from 'zod';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Box, Button, TextField } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'
// import Link from 'next/link';

// type FormData = {
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//     password: string;
//     confirmPassword: string;
// }
// export default function RegisterPage() {
//     const schema: ZodType<FormData> = z.object({
//         firstName: z.string().min(2).max(30),
//         lastName: z.string().min(2).max(30),
//         email: z.string().email(),
//         age: z.number().min(18).max(70),
//         password: z.string().min(5).max(20),
//         confirmPassword: z.string().min(5).max(20)
//     }).refine((data) => data.password === data.confirmPassword, {
//         message: "Passwords donot match",
//         path: ["confirmPassword"]
//     })

//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
//     const submitData = (data: FormData) => {
//         console.log("IT worked", data)
//     }
//     return (
//         <Box component="form" onSubmit={handleSubmit(submitData)}>
//             <Grid container direction="column" alignContent="center" spacing={2}>
//                 <Grid>
//                     {errors.firstName && <span>{errors.firstName.message}</span>}
//                     <TextField id='outlined-basic' label="First Name" variant='outlined' {...register("firstName")} />
//                 </Grid>
//                 <Grid >
//                     {errors.lastName && <span>{errors.lastName.message}</span>}
//                     <TextField id='outlined-basic' label="Last Name" variant='outlined' {...register("lastName")} />
//                 </Grid>
//                 <Grid>
//                     {errors.email && <span>{errors.email.message}</span>}
//                     <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
//                 </Grid>
//                 <Grid>
//                     {errors.age && <span>{errors.age.message}</span>}
//                     <TextField id='outlined-basic' type='number' label="Age" variant='outlined' {...register("age", { valueAsNumber: true })} />
//                 </Grid>
//                 <Grid>
//                     {errors.password && <span>{errors.password.message}</span>}
//                     <TextField id='outlined-basic' label="Password" type='password' variant='outlined' {...register("password")} />
//                 </Grid>
//                 <Grid>
//                     {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
//                     <TextField id='outlined-basic' label="Confirm Password" type='password' variant='outlined' {...register("confirmPassword")} />
//                 </Grid>
//                 <Grid>
//                     <Button variant='outlined' type='submit'>Sign Up</Button>
//                 </Grid>
//                 <Grid>
//                     <Link href={`/login`}>Already Have Account</Link>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }
"use client"
import {useFormState} from "react-dom"
import createUserAction from "./registerAction"
export default function SignUp(){
    const [error, formAction] = useFormState(createUserAction, undefined)
    // async function signup(formData: FormData){
    //     "use server";

    //     //Get data off form
    //     const email = formData.get("email");
    //     const password = formData.get("password")

    //     //send to our api route
    //     const res = await fetch("http://localhost:3000/api/signup",{
    //         method: "POST",
    //         headers:{
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({email, password})
    //     });
    //     const content = await res.json();
    //     console.log(content);

    //     //Redirect to login
    //     if(res.ok){
    //         redirect("/login")
    //     }
    // }
    return(
        <div>
            <h1>Sign Up</h1>
            <form action={formAction}>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}