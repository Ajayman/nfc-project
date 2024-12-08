'use client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Link from 'next/link';
import ProductRating from './productRating';
import { Product } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
export default function ProductCard({ item }: Product) {
    const [product, setProduct] = useState(item)
    const router = useRouter();
    function handleBtn(productId: string) {
        router.push('/checkout')
    }
    return (

        <Card sx={{ height: 380, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                src={product.imageUrl[0]}
                sx={{ width: '60%', height: '40%', }}
            />
            <CardContent sx={{ textAlign: 'center', textDecorationStyle: 'none' }}>
                <Link href={`/products/${product.id}`}>
                    <Typography variant='h5' component="div">
                        {product.name}
                    </Typography>
                </Link>
                <Typography variant='body2' component="div" sx={{ color: 'text.secondary' }}>
                    {product.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <span className='text-xl'>Nprs. {product.price}  </span>
                    <span className='line-through text-sm text-slate-500'>{product.discountedPrice}</span>
                </Typography>
                <ProductRating rating={product.rating} />
            </CardContent>
            <CardActions>
                <Button size='small' variant='outlined' color='success' onClick={() => handleBtn(product.id)}>Buy Now</Button>
            </CardActions>
        </Card>
    )
}