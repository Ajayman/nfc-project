import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ImgMediaCard({ id, imageSrc, title, price }) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        src={imageSrc}
      />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant='outlined' size="small">Add to cart</Button>
      </CardActions>
      <CardContent>
          <Link href={`/products/${id}`}>
            {title}
          </Link>
        <Typography gutterBottom variant="subtitle1" component="div">
          Nprs.{price}
        </Typography>
      </CardContent>
    </Card>
  );
}