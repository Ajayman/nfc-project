'use client'
import React, { useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, InputBase, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ContactAction from "./contactAction"
import { schema } from "./contactSchema"
import { useFormState } from 'react-dom';
type FormData = {
    name: string;
    email: string;
    phoneNumber: string;
    comment: string;
}

export default function ContactPage() {
    const [state, formAction] = useFormState(ContactAction, {
        message: ""
    })
    const form = useForm<FormData>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState: { errors } } = form;
    const formRef = useRef<HTMLFormElement>(null)
    // const submitData: SubmitHandler<FormData> = async (data: FormData) => {
    //     const formData = new FormData();
    //     formData.append("name", data.name)
    //     formData.append("email", data.email)
    //     formData.append("phoneNumber", data.phoneNumber)
    //     formData.append("comment", data.comment)
    //     console.log(await ContactAction(formData))
    // }
    return (
        <>

            <Box
                component="form"
                ref={formRef}
                sx={{ mt: '30px' }}
                // onSubmit={handleSubmit(() => formRef.current?.submit())}
                action={formAction}
            >
                <Grid container justifyContent='center'>
                    <Grid item textAlign='center'>
                        <Typography variant='h3'>
                            Contact Us
                        </Typography>
                        <Typography variant='h6'>
                            Thank you for your time visiting our site. Fill out form We will back to you shortly.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignContent="center" spacing={1}>
                    <Grid item sx={{mt:3}}>
                        {errors.name && <span>{errors.name.message}</span>}
                        <TextField id='outlined-basic' label="Name" variant='outlined' {...register("name")} />
                    </Grid>
                    <Grid item>
                        {errors.email && <span>{errors.email.message}</span>}
                        <TextField id='outlined-basic' label="Email" variant='outlined' {...register("email")} />
                    </Grid>
                    <Grid item>
                        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                        <TextField id='outlined-basic' label="Phone Number" variant='outlined' {...register("phoneNumber")} />
                    </Grid>
                    <Grid item>
                        {errors.comment && <span>{errors.comment.message}</span>}
                        <TextField id='outlined-basic' label="Comment" variant='outlined' {...register("comment")} />
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' type='submit'>Send</Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container direction="column" alignContent="center" sx={{ mt: '40px' }}>
                <Grid>
                    <Typography variant='h3'>Contact Detail</Typography>
                    <Typography variant='subtitle1'>Number: 9863662631</Typography>
                    <Typography variant='subtitle1'>Email: nina.fscollection@gmail.com</Typography>
                    <Typography variant='subtitle1'>Kamalbinayak-10, Bhaktapur</Typography>
                </Grid>
            </Grid>

            <Grid container direction="column" alignContent='center' sx={{ mt: '40px' }}>
                <Grid>
                    <Typography variant='h3'>Subscribe us</Typography>
                    <Typography variant='subtitle1'>Be the first to know our notification on your email</Typography>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', justifyContent: 'space-between', pl: 3 }}
                    >
                        <InputBase placeholder='Subscribe' />
                        <IconButton type='button'>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
// "use client"
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, SubmitHandler } from "react-hook-form";
// import ContactAction from './contactAction';
// const schema = z.object({
//     name: z.string().trim().min(1, {
//         message: "Name is required"
//     }),
//     email: z.string().trim().email({
//         message: "Invalid email address"
//     }),
//     phoneNumber: z.string().trim().min(1, {
//         message: "Write appropriate Phone number"
//     }),
//     comment: z.string().trim().min(10, {
//         message: "Write some comment"
//     })
// })
// type FormSchema = z.output<typeof schema>
// // interface Contacts {
// //     name: string,
// //     email: string,
// //     phoneNumber: string,
// //     comment: string
// // }

// export default function ContactForm() {
//     const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver:zodResolver(schema)})
//     // const onSubmit: SubmitHandler<Contacts> = data => ContactAction(data)
//     return (
//         <form onSubmit={handleSubmit(console.log)}>
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name"  />
//             <label htmlFor="email">Email</label>
//             <input type="text" id="email"  />
//             <label htmlFor="phoneNumber">Phone Number</label>
//             <input type="text" id="phoneNumber"  />
//             <label htmlFor="comment">Comment</label>
//             <input type="text" id="comment"  />
//             <input type="submit" value="Submit" />
//         </form>
//     )
// }