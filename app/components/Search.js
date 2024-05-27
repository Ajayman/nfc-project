'use client'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Paper } from '@mui/material'
import InputBase from '@mui/material/InputBase';
export default function SearchProducts({ getSearchResults }) {
    const [query, setQuery] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/searchProduct?query=${query}`)
        const product = await response.json()
        getSearchResults(product)
    }
    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{display: {xs: 'none', sm: 'block'}}}
        >
            <InputBase sx={{ml: 1}} placeholder="search product" value={query} onChange={e => setQuery(e.target.value)} />
            <Button variant="contained" type='submit'>Search</Button>
        </Paper>
    )
}