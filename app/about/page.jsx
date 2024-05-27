// async function getData() {
//     const res = await fetch('https://my-json-server.typicode.com/typicode/demo/posts')
//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return res.json()
// }

import { Box, Grid, Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { about } from 'app/products'
// async function getAbout() {
//     const res = await fetch(process.env.ROOT_URL + '/api/about')
//     console.log(res);
//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     return res.json();
// }

export default async function AboutPage() {
    // const { about } = await getAbout();
    //will be done with fully fetching from backend
    // const apiData = await getData();
    return (
        <div>
            <Grid container sx={{ mt: 4, mb:2 }}>
                <Grid item xs={12} sx={{mb:2}}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>About Us</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Living valley had silent eat merits esteem bed. In last an or went wise as left. Visited civilly am demesne so colonel he calling. So unreserved do interested increasing sentiments. Vanity day giving points within six not law. Few impression difficulty his use has comparison decisively.
                        Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container sx={{justifyContent:"space-between", mt: 4, mb:2}}>
                <Grid item xs={6}>
                    <Typography variant="h5" sx={{mb:2}}>
                        Our Designer
                    </Typography>
                    <Typography variant="subtitle2">
                        Oh to talking improve produce in limited offices fifteen an. Wicket branch to answer do we. Place are decay men hours tiled. If or of ye throwing friendly required. Marianne interest in exertion as. Offering my branched confined oh dashwood.
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ alignSelf: "flex-end" }}>
                    <img src="Nina-logo.jpg" alt="Desinger Photo" width='100%' />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{mt: 4, mb:2}}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{mb:2}}>
                        How we design
                    </Typography>
                </Grid>
                {about.map((item, key) => (
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
                ))}
            </Grid>
        </div>
    )
}
