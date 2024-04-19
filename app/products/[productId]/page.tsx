import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import "react-multi-carousel/lib/styles.css"

async function getProductById(productId: string){
    const res = await fetch(`http://localhost:3000/api/products/${productId}`)
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function ProductDetail({params}: any) {
    const {product} = await getProductById(params.productId);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                <Grid xs={4}>
                    <IconButton aria-label="back">
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center">
                    <Typography variant="subtitle1" component="div">
                        {product.name}
                    </Typography>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="right">
                    <IconButton aria-label="heart">
                        <FavoriteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography variant='h6'>
                {product.title}
            </Typography>
            <Typography variant='subtitle1'>
                {product.description}
            </Typography>
            <Stack spacing={2} direction="row" justifyContent='center'>
                <Button variant="outlined">S</Button>
                <Button variant="contained">M</Button>
                <Button variant="outlined">L</Button>
            </Stack>
            <Stack spacing={4} direction='row' justifyContent='center'>
                <Button variant='contained'>Add To Cart</Button>
                <Typography>Nrs. {product.price}</Typography>
            </Stack>
        </Box >
    )
}



//------------------------params code on client side and server side--------------------------
// "use client"
// import { useParams } from "next/navigation"

// export default function ProductPage(){
//     const params = useParams();
//     console.log(params);
//     return;
// }

// "use client"

// import { useSearchParams } from "next/navigation"

// export default function ProductPage(){
//     const params = useSearchParams();
//     const newParams = params?.get('name')
//     console.log(newParams)
// }


// export default function ProductPage({params}: any){
//     return <main>{params.productId}</main>
// }

// export default function ProductPage({params, searchParams}: any){
//     console.log(searchParams);
//     return <main>{searchParams.name}</main>
// }

//------------------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//     id?: Number,
//     name?: String,
//     imageSrc?: String,
//     price?: Number,
//     title?: String,
//     description?: String
// }

// export default function ProductDetail({params}:any){
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(false);
//     const getProductById = async()=> {
//         try{
//             setLoading(true);
//             const response = await fetch(
//                 `http://localhost:3000/api/products/${params.productId}`,
//                 {
//                     method: 'GET'
//                 }
//             );
//             debugger;
//             if(response){
//                 const {product} = await response.json();
//                 if(product) setProduct(product)
//             }
//         }catch(error){
//             console.log(error)
//         }finally{
//             setLoading(false);
//         }
//     };

//     useEffect(()=> {
//         getProductById()
//     }, []);

//     return(
//         <main>
//             {loading && <div>loading</div>}
//             {!loading &&<div>{product && <h1>{product.title}</h1>}
//             {product && <h1>{product.description}</h1>}</div>}
//         </main>
//     )
// }