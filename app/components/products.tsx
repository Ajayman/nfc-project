import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchFilteredProducts } from '@/app/lib/actions'
import { Grid } from '@mui/material';
export default async function Products({
  query,
  currentPage
}: {
  query: string,
  currentPage: number
}
) {
  const products = await fetchFilteredProducts(query, currentPage);
  function handleCart() {
    console.log("called")
  }
  function handleDetail() {
    console.log("called")
  }
  return (
    <Grid sx={{ mt: 4 }} container spacing={2}>
      {
        products?.map((product, i) => (
          <Grid item xs={6} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                key={i}
                src={product.imageUrl}
              />
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant='outlined' size="small">Add to cart</Button>
              </CardActions>
              <CardContent>
                <Button key={i}>
                  {product.title}
                </Button>
                <Typography gutterBottom variant="subtitle1" component="div" key={i}>
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