'use client'
import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import login from "./loginAction"
import { Span } from 'next/dist/trace';
// import {authenticate} from 'app/lib/actions'

type FormData = {
  email: string;
  password: string;
}

export default function LoginPage() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string()
  })
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const submitData = (data: FormData) => {
    console.log("IT worked", data)
  }
  const [error, formAction] = useFormState(login, undefined)
  return (
    <Box component="form" action={formAction} sx={{mt:4}}>
      <Grid container justifyContent='center' sx={{mb:3}}>
        <Typography variant="h3">
          Login
        </Typography>
      </Grid>
      <Grid container direction="column" alignContent="center" spacing={1}>
        <Grid direction="column">
          <div>
            {errors.email && <span>{errors.email.message}</span>}
            <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
          </div>
        </Grid>
        <Grid>
          <div>
            {errors.email && <span>{errors.email.message}</span>}
            <TextField id='outlined-basic' label="Password" variant='outlined' {...register("password")} />
          </div>
        </Grid>
        <Grid>
          <Button variant='outlined' type='submit'>Login</Button>
          {error && <p>{error}</p>}
        </Grid>
        <Grid>
          <Link href={`/register`}>Create Account</Link>
        </Grid>
      </Grid>
    </Box >
  )
}



// import {authenticate} from 'app/lib/actions'


// "use client"
// import { useRouter } from "next/navigation";
// import login from "./loginAction"
// import { useFormState } from "react-dom"
// import { Box } from "@mui/material";
// export default function LoginPage() {
//   const [error, formAction] = useFormState(login, undefined)
//   const router = useRouter();
//   function handleForget(e) {
//     e.target.preventDefault();
//     router.push("/forget")
//   }
//   return (
//     <Box
//       component="form"
//       action={formAction}
//     >
//       <TextField required />
//       <input type="email" name='email' placeholder='Email' required />
//       <input type="password" name='password' placeholder='Password' />
//       <a href="/forget" onClick={handleForget}>Forget your password?</a>
//       <button type='submit'>Login</button>
//       {error && <p>{error}</p>}
//     </Box>
//   )
// }