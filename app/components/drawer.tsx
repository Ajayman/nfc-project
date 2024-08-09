"use client"
import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default function DrawerList({cookie, cartItem}) {
    if(cookie) {
        return (
            <Box sx={{ width: 250 }} >
                <Typography variant='h5'>No item on cart yet </Typography>
                <Typography variant='h5'>{cartItem[0].quantity}</Typography>
            </Box>
        )
    }else{
        redirect('/login');
    }

}