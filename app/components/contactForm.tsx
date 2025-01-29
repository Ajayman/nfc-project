'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { formContactAction } from 'app/lib/actions';
import { contactSchema } from 'app/lib/schemas'

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
        <form onSubmit={handleSubmit(processForm)}>
            <Grid container spacing={1} justifyContent="center">
                <Grid item display="flex" direction="column" alignItems="center" justifyContent="space-evenly" width= "400px" height="450px" sx={{ m: 3, border: '2px solid lightgrey', borderRadius: '5px' }}>
                    <Typography variant='h5'>Send Message</Typography>
                    < TextField id='outlined-basic' label="Name" variant='outlined' {...register('name')} />
                    {errors.name?.message && (<p className='text-sm text-red-400'>{errors.name?.message}</p>)}

                    < TextField id='outlined-basic' label="Email" variant='outlined' {...register('email')} />
                    {errors.email?.message && (
                        <p className='text-sm text-red-400'>{errors.email.message}</p>
                    )}

                    < TextField id='outlined-basic' label="Phone Number" variant='outlined' {...register('phoneNumber')} />
                    {errors.phoneNumber?.message && (
                        <p className='text-sm text-red-400'>{errors.phoneNumber.message}</p>
                    )}

                    < TextField id='outlined-basic' label="Comment" variant='outlined' {...register('comment')} />
                    {errors.comment?.message && (
                        <p className='text-sm text-red-400'>{errors.comment.message}</p>
                    )}
                    <Button variant='outlined' type='submit' > Send </Button>
                </Grid>
            </Grid>
        </form>
    )
}
