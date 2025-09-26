'use client'
import { Box, Grid, Typography, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { deleteCookies } from "../../lib/actions";
import { useState, useEffect } from 'react';

export default function UserProfile() {
    // const response = await fetch('/api/loggedInUser', { method: 'GET', credentials: 'include' })
    // const data = await response.json();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/loggedInUser", { method: "GET", headers: { "Content-Type": "application/json" } })
                const data = await res.json()
                console.log(data);
                if (res.ok) {
                    setUser(data.user);
                } else {
                    setError(data.error)
                }
            }
            catch (error) {
                setError('An Unexpected error occured');
            }
        }
        fetchUser();
    }, [])


    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid container sx={{ marginTop: "50px" }}>
                <Typography variant="h3">Account</Typography>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon />
                    <button onClick={async () => { const result = await deleteCookies() }}>Logout</button>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", marginTop: "100px" }}>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h3">Order History</Typography>
                    <Typography>You haven't placed any orders yet</Typography>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h3">Account Details</Typography>
                    <Typography>{`${user?.firstName}` + ` ` + `${user?.lastName}`}</Typography>
                    <Typography>{`${user?.email}`}</Typography>
                    {/* <Typography>Kamalbinayak, Bhaktapur</Typography> */}
                </Grid>
            </Grid>
        </Box>
    )
}