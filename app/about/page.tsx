import { Grid, Typography } from "@mui/material"
import { readAbout } from 'app/actions1/readAction'
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: 'About'
}
export default async function AboutPage() {
    const aboutData = await readAbout();
    return (
        <div>
            <Grid container sx={{ mt: 4, mb: 2 }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>About Us</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{aboutData[0].aboutDescription}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", mt: 4, mb: 2 }}>
                <Grid item xs={6}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Our Designer
                    </Typography>
                    <Typography variant="subtitle2">
                        {aboutData[0].designerDetail}
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ alignSelf: "flex-end" }}>
                    {/* <img src={about[0].designerImageUrl} alt="Desinger Photo" width='100%' /> */}
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 4, mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        How we design
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
