'use client'
import { useRouter } from 'next/navigation'
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams, usePathname } from 'next/navigation';
export default function SearchProducts() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    function SearchAction(formData) {
        const term = formData.get('search')
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if(term) {
            params.set('query', term)
        } else {
            params.delete('query');
        }
        router.push(`/products/search?${params.toString()}`);
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
                name='search'
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}