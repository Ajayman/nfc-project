'use client'

import { z } from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { loginSchema } from '@/app/lib/schemas';
import { loginUserAction } from '@/app/lib/actions';
type Inputs = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { register,
    handleSubmit,
    formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(loginSchema) })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await loginUserAction(data)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(processForm)} sx={{ mt: 4 }}>
      <Grid container justifyContent='center' sx={{ mb: 3 }}>
        <Typography variant="h3">
          Login
        </Typography>
      </Grid>
      <Grid container direction="column" alignContent="center" spacing={1}>
        <Grid direction="column">
          <div>
            <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
            {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}
          </div>
        </Grid>
        <Grid>
          <div>
            <TextField id='outlined-basic' label="Password" type='password' variant='outlined' {...register("password")} />
            {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}
          </div>
        </Grid>
        <Grid>
          <Button variant='outlined' type='submit'>Login</Button>
        </Grid>
        <Grid>
          <Link href={`/register`}>Create Account</Link>
        </Grid>
      </Grid>
    </Box >
  )
}
