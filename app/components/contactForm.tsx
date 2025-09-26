'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { formContactAction } from 'app/lib/actions';
import { contactSchema } from 'app/lib/schemas'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import {TextareaAutosize as BaseTextareaAutosize} from '@mui/base/TextareaAutosize'
const theme = createTheme({
    palette: {
        light: {
            main: '#e9e0e5'
        }
    }
})

// const CssTextField = styled(TextField)({

// })

type Inputs = z.infer<typeof contactSchema>  // here Input type is extracted from contactSchema

export default function ContactForm() {
    const [data, setData] = useState<Inputs>()

    const { register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(contactSchema)
    })

    const processForm: SubmitHandler<Inputs> = async data => {
        const result = await formContactAction(data)

        if (!result) {
            console.log('Something went wrong')
            return
        }
        if (result.error) {
            console.log(result.error)
        }
        reset()
        setData(result.data)
    }
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(processForm)}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item display="flex" direction="column" alignItems="center" justifyContent="space-evenly" width="400px" height="450px">
                        <Typography variant='h5'>Send Message</Typography>
                        < TextField fullWidth id='outlined-basic' color='warning' label="Name" variant='outlined' {...register('name')} />
                        {errors.name?.message && (<p className='text-sm text-red-400'>{errors.name?.message}</p>)}

                        < TextField fullWidth id='outlined-basic' color='warning' label="Email" variant='outlined' {...register('email')} />
                        {errors.email?.message && (
                            <p className='text-sm text-red-400'>{errors.email.message}</p>
                        )}

                        < TextField fullWidth id='outlined-basic' color='warning' label="Phone Number" variant='outlined' {...register('phoneNumber')} />
                        {errors.phoneNumber?.message && (
                            <p className='text-sm text-red-400'>{errors.phoneNumber.message}</p>
                        )}

                        < TextField fullWidth id='outlined-basic' color='warning' label="Comment" variant='outlined' {...register('comment')} />
                        {errors.comment?.message && (
                            <p className='text-sm text-red-400'>{errors.comment.message}</p>
                        )}
                        <Button variant='outlined' sx={{bgcolor: 'light.main'}} type='submit' size='large'> Send </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    )
}
