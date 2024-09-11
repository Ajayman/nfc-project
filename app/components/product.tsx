"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';
import {CartAdd} from '../lib/actions';
import {Product} from '@prisma/client'
export default function ImgMediaCard({ item }: Product) {
  const router = useRouter();
  function handleDetail(){
    router.push(`/products/${item.id}`)
  }
  // function handleCart(){
  //   CartAdd(id, qty=1,)
    
  // }
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        src={item.imageUrl}
      />
      <CardActions sx={{ justifyContent: "center" }}>
        {/* <Button variant='outlined' size="small" onClick={()=> handleCart()}>Add to cart</Button> */}
      </CardActions>
      <CardContent>
          <Button onClick={()=> handleDetail()}>
            {item.title}
          </Button>
        <Typography gutterBottom variant="subtitle1" component="div">
          Nprs.{item.price}
        </Typography>
      </CardContent>
    </Card>
  );
}