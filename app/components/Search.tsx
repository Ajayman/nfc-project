'use client'
import {useRouter} from 'next/navigation'
import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
export default function SearchProducts() {
    const router = useRouter()
    function SearchAction(formData){
        const query = formData.get("query");
        router.push(`/products/search?query=${query}`)
    }
    return (
        <Box component="form" action={SearchAction} sx={{ mt: 4 }}>
            <Grid container alignContent="center" spacing={1}>
                <Grid item>
                        <TextField label="Search" name="query" />
                </Grid>
                <Grid item>
                    {/* <Button type='submit'>Search</Button> */}
                    <Button variant='contained' type='submit'>Search</Button>
                </Grid>
            </Grid>
        </Box>
    )
}