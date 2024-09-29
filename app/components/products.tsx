import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchFilteredProducts } from '@/app/lib/actions'
import { Grid } from '@mui/material';
import Link from 'next/link';
import ProductRating from './productRating';
export default async function Products({
  query,
  currentPage
}: {
  query: string,
  currentPage: number
}
) {
  const filteredProducts = await fetchFilteredProducts(query, currentPage)
  return (
    <Grid sx={{ mt: 4 }} container spacing={2}>
      {
        filteredProducts.map((product, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Link href={`/products/${product.id}`}>
              <Card sx={{ height: 380, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  src={product.imageUrl[0]}
                  sx={{ width: '60%', height: '40%', }}
                  key={i}
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
                  <ProductRating rating={product.rating} />
                </CardContent>
                <CardActions>
                  <Button size='small' variant='outlined' color='success'>Buy Now</Button>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))
      }
    </Grid>
  )
}