'use client'
import { Box, Grid, Typography, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link"
import { deleteCookies } from "./profileAction";
export default function UserProfile() {
    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid container sx={{marginTop: "50px"}}>
                <Typography variant="h3">Account</Typography>
                <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                    <PersonIcon />
                    <button onClick={ async()=> {const result = await deleteCookies()}}>Logout</button>
                </Grid>
            </Grid>
            <Grid container sx={{justifyContent: "space-between", marginTop: "100px"}}>
                <Grid item sx={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h3">Order History</Typography>
                    <Typography>You haven't placed any orders yet</Typography>
                </Grid>
                <Grid item sx={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h3">Account Details</Typography>
                    <Typography>Nina Awal</Typography>
                    <Typography>Kamalbinayak, Bhaktapur</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}