'use client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchFilteredProducts } from '@app/lib/actions'
import { Grid } from '@mui/material';
import Link from 'next/link';
import ProductRating from './productRating';
import { useEffect, useState } from 'react';
import { deleteProduct } from '@app/lib/actions';
import { editProduct } from '@app/lib/actions'
function deleteProductAction(product_id) {
  deleteProduct(product_id)
}

function editProductAction(product_id){
  editProduct(product_id)
}

function ButtonAction({ type, product_id }) {
  if (type == "Edit") {
    return <>
      <Button onClick={()=> editProductAction(product_id)} size='small' variant='outlined' color='success'>Edit</Button>
      <Button onClick={()=>deleteProductAction(product_id)} size='small' variant='outlined' color='error'>Delete</Button>
    </>
  }
  else if (type == "Buy") {
    return <Button size='small' variant='outlined' color='success'>Buy Now</Button>
  }
}
export default function Products({
  type,
  query,
  currentPage
}: {
  type: string
  query: string,
  currentPage: number
}
) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFilteredProducts(query, currentPage)
        if(!result){
          throw new Error('Failed to fetch data');
        }
        setFilteredProducts(result);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchData()
  }, [currentPage]);
  // const filteredProducts = await fetchFilteredProducts(query, currentPage)

  return (
    <Grid sx={{ mt: 4 }} container spacing={2}>
      {
        filteredProducts.map((product, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Card sx={{ height: 380, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                src={product.imageUrl[0]}
                sx={{ width: '60%', height: '40%', }}
                key={i}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Link href={`/products/${product.id}`}>
                  <Typography variant='h5' component="div">
                    {product.name}
                  </Typography>
                </Link>
                <Typography variant='body2' component="div" sx={{ color: 'text.secondary' }}>
                  {product.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Nprs. <span className='text-lg'>{product.price}</span>
                </Typography>
                <ProductRating rating={product.rating} />
              </CardContent>
              <CardActions>
                <ButtonAction
                  type={type} product_id={product.id}
                />
              </CardActions>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}