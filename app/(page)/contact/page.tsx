import ContactForm from "app/components/contactForm";
import { Grid, Typography, Paper, InputBase, IconButton, Box, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Metadata } from "next";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
export const metadata: Metadata = {
    title: 'Contact'
}
export default function ContactPage() {
    return (
        <>
            <Grid container sx={{ mt: 3 }}>
                <Grid item xs={12} textAlign='center'>
                    <Typography variant='h3'>
                        Contact Us
                    </Typography>
                    <Typography variant='h6'>
                        Thank you for your time visiting our site. Fill out form We will back to you shortly.
                    </Typography>
                </Grid>

                <Grid item xs={6} display="flex" direction="column" justifyContent="center" alignItems="center">
                    <Box>
                        <Stack direction="row" alignItems="center">
                            <RoomOutlinedIcon sx={{ height: "80px", width: "80px", mr: 2 }} color="primary" fontSize="small" />
                            <div>
                                <Typography variant='h5'>Address</Typography>
                                <Typography variant='subtitle1'>Kamalbinayak-10, Bhaktapur</Typography>
                            </div>
                        </Stack>
                        <Stack direction="row" alignItems="center" sx={{mt: 3}}>
                            <EmailIcon sx={{ height: "80px", width: "80px", mr: 2 }} color="primary" fontSize="small" />
                            <div>
                                <Typography variant='h5'>Email</Typography>
                                <Typography variant='subtitle1'>nina.fscollection@gmail.com</Typography>
                            </div>
                        </Stack>
                        <Stack direction="row" alignItems="center" sx={{mt: 3}}>
                            <PhoneIcon sx={{ height: "80px", width: "80px", mr: 2 }} color="primary" fontSize="small" />
                            <div>
                                <Typography variant='h5'>Phone</Typography>
                                <Typography variant='subtitle1'>9863662631</Typography>
                            </div>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <ContactForm />
                </Grid>
            </Grid >
            <Grid container sx={{mt:4}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.423550975401!2d85.43717079999999!3d27.675120099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b485f1d1d63%3A0x76f25aa7e78f21ff!2sNina%20Fashion%20Collection!5e1!3m2!1sen!2snp!4v1735617329702!5m2!1sen!2snp" width="100%" height="600" loading="lazy"></iframe>
            </Grid>
            {/* <Grid container direction="column" alignContent='center' sx={{ mt: '40px' }}>
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
            </Grid> */}
        </>
    )
}