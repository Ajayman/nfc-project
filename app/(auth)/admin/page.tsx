'use client'

import { z } from 'zod';
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { dashboardLoginSchema} from '@app/lib/schemas';
import { loginDashboardAction } from '@app/lib/actions';
type Inputs = z.infer<typeof dashboardLoginSchema>

export default function LoginDashboardPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(dashboardLoginSchema) })
  const [serverError, setServerError] = useState<string | null>(null)
  const processForm: SubmitHandler<Inputs> = async data => {
    setServerError('');  // clear any previous general error
    const result = await loginDashboardAction(data)
    if (!result.success) {
      setServerError(result.message)
    }
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
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
            <TextField id='outlined-basic' label="Username" variant='outlined' {...register("username")} />
            {errors.username && <p className='text-sm text-red-400'>{errors.username.message}</p>}
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
      </Grid>
    </Box >
  )
}
