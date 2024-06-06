'use client'
import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { readAbout } from 'app/actions/readAction'

export default function AboutPage() {
    const [about, setAbout] = useState({});
    console.log(about);
    useEffect(() => {
        const getAllItem = async () => {
            const itemData = await readAbout()
            setAbout(itemData);
        };
        getAllItem()
    }, []);
    return (
        <div>
            <Grid container sx={{ mt: 4, mb: 2 }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>About Us</Typography>
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography variant="subtitle1">{about[0].aboutDescription} */}
                    <Typography variant="subtitle1">about description
                    </Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", mt: 4, mb: 2 }}>
                <Grid item xs={6}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Our Designer
                    </Typography>
                    <Typography variant="subtitle2">
                        {/* {about[0].designerDetail} */}
                        about designer detail
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
                {/* {about.map((item, key) => (
                    <Grid item xs={2} key={item.id}>
                        <Card>
                            <CardMedia
                                sx={{ height: 250 }}
                                image={item.imageSrc}
                                title={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.subtitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}
            </Grid>
        </div>
    )
}
