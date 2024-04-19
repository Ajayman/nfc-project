'use client'
import { useState } from 'react'
export default function SearchProducts({ getSearchResults }) {
    const [query, setQuery] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/searchProduct?query=${query}`)
        const product = await response.json()
        getSearchResults(product)   
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="search product" value={query} onChange={e => setQuery(e.target.value)} />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}