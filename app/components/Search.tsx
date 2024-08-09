'use client'
import { useRouter } from 'next/navigation'
import { Box, Button, IconButton, InputAdornment, InputBase, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function SearchProducts() {
    const router = useRouter()
    function SearchAction(formData) {
        const query = formData.get("query");
        router.push(`/products/search?query=${query}`)
    }
    return (
        <Paper
            component="form"
            action={SearchAction}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Your Product"
                name='query'
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}