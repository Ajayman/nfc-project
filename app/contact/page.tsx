import ContactForm from "app/components/contactForm";
import { Grid, Typography, Paper, InputBase,IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Contact'
}
export default function ContactPage() {
    return (
        <>
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
            <ContactForm />
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