import { Container, Grid, Typography } from "@mui/material"
import { readAbout } from 'app/lib/actions'
import { Metadata } from 'next';
import Image from "next/image";
export const metadata: Metadata = {
    title: 'About'
}
export default async function AboutPage() {
    const aboutData = await readAbout();
    return (
        <Container maxWidth="xl">
            <Grid container sx={{ mt: 4, mb: 2, backgroundColor: 'lightgrey' }} >
                <Grid item xs={6} sx={{ mb: 2, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 4 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>About Us</Typography>
                    <Typography variant="subtitle1">{aboutData?.aboutDescription}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                    <Image src={aboutData.aboutTitleImageUrl} alt="About Picture" width={400} height={400} />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 4, mb: 2 }} >
                <Grid item xs={6} sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                    <Image src={aboutData.designerImageUrl} alt="About Picture" width={400} height={400} />
                </Grid>
                <Grid item xs={6} sx={{ mb: 2, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 4 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>Our Designer</Typography>
                    <Typography variant="subtitle1">{aboutData?.designerDetail}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 4, mb: 2 }} >
                <Grid item xs={6} sx={{ mb: 2, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 4 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>Our Story</Typography>
                    <Typography variant="subtitle1">{aboutData?.ourStoryDescription}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                    <Image src={aboutData.ourStoryImageUrl} alt="About Picture" width={400} height={400} />
                </Grid>
            </Grid>
        </Container>
    )
}
