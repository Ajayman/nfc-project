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
export default function FilterProducts({item}: Product) {
    const [product, setProduct] = useState(item)
    return (
        <Grid item xs={6} sm={4} md={3}>
            <Link href={`/products/${product.id}`}>
                <Card sx={{ height: 380, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        src={product.imageUrl}
                        sx={{ width: '60%', height: '40%', }}
                    />
                    <CardContent sx={{ textAlign: 'center', textDecorationStyle: 'none' }}>
                        <Typography variant='h5' component="div">
                            {product.name}
                        </Typography>
                        <Typography variant='body2' component="div" sx={{ color: 'text.secondary' }}>
                            {product.title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Nprs. <span className='text-lg'>{product.price}</span>
                        </Typography>
                        <ProductRating />
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='outlined' color='success'>Buy Now</Button>
                    </CardActions>
                </Card>
            </Link>
        </Grid>
    )
}