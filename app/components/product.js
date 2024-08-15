"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';
import CartAdd from 'app/actions1/cartAction';

export default function ImgMediaCard({ id, name, imageUrl, title, price }) {
  const router = useRouter();
  function handleDetail(){
    router.push(`/products/${id}`)
  }
  function handleCart(){
    CartAdd(id, qty=1,)
    
  }
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        src={imageUrl}
      />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant='outlined' size="small" onClick={()=> handleCart()}>Add to cart</Button>
      </CardActions>
      <CardContent>
          <Button onClick={()=> handleDetail()}>
            {title}
          </Button>
        <Typography gutterBottom variant="subtitle1" component="div">
          Nprs.{price}
        </Typography>
      </CardContent>
    </Card>
  );
}