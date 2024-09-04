import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchFilteredProducts } from '@/app/lib/actions'
import { Grid } from '@mui/material';
import Link from 'next/link';
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
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                src={product.imageUrl}
              />
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant='outlined' size="small">Add to cart</Button>
              </CardActions>
              <CardContent>
                <Link href={`/products/${product.id}`}>{product.title}</Link>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Nprs.{product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}