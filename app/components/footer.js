import Grid from "@mui/material/Unstable_Grid2"
import { Typography } from "@mui/material"
export default function footer() {
    return (
        <Grid container direction={"column"} alignItems={"center"} spacing={2}>
            <Grid><Typography variant="h4">Our Goal</Typography></Grid>
            <Grid><Typography variant="h6">Our goal of ninafscollection.com is to be</Typography></Grid>
            <Grid><Typography variant="h6">best top fashion collection of boutique on nepali fashion store</Typography></Grid>
        </Grid>
    )
}