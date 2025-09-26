'use client'
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Box, Breadcrumbs, FormControl, Link, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";
import Button from '@mui/material/Button';
import ChooseSize from "app/components/Variant";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import ProductRating from "@app/components/productRating"
import { Product } from '@prisma/client';
import ChooseVariant from 'app/components/Variant';
import { addWishList, FormState } from 'app/lib/actions'
import ReactQuill from 'react-quill';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BuyProductAction } from 'app/lib/actions';
import { Span } from 'next/dist/trace';
import { orderSchema } from '@app/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderData } from '@app/lib/schemaType';
import { ActionState, initialState } from '@app/lib/utils';



export default function ProductDetailContent({ item }: Product) {
    const [state, formAction] = useFormState(BuyProductAction, initialState)
    const [product, setProduct] = useState(item);
    // const [color, setColor] = React.useState<string | null>("");
    // const [size, setSize] = React.useState<string | null>("");
    const { register, reset, formState: { errors } } = useForm<OrderData>({
        resolver: zodResolver(orderSchema), defaultValues: {
            productId: product.id,
            fullName: '',
            email: '',
            phoneNumber: '',
            fullAddress: '',
            message: ''
        }
    })
    useEffect(() => {
        if (state.success) {
            setOpen(false);
            reset();
        }
    }, [state.success]);
    // const onSubmit: SubmitHandler<FormData> = (data) => {
    //     // async () => {
    //     //     await BuyProductAction(data)
    //     // }
    //     reset();
    // }
    // const handleColor = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newColor: string | null,
    // ) => {
    //     setColor(newColor);
    // };

    // const handleSize = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newSize: string | null
    // ) => {
    //     setSize(newSize)
    // }

    const handleWishlist = async () => {
        const res = await addWishList(item.id)
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        reset();
    }
    // const quill = new Quill('#editor', {
    //     theme: 'snow'
    // })
    // const QuillOutput = ({quillHtml}) => {
    //     return (
    //         <div
    //             className="quill-output"
    //             dangerouslySetInnerHTML={{__html:quillHtml}}
    //         />
    //     )
    // }
    // const htmlString = quill.getSementicHTML();
    // <QuillOutput quillHtml = {product.longDescription} />
    return (
        <Grid xs={12} md={5} sx={{ height: '400' }}>
            <Chip label={product.category} />{state.message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${state.success
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {state.message}
                </div>
            )}

            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid xs={6}>
                    {/* <div role="presentation" onClick={handleBreadcrumbClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href=""
                            >
                                {product.category}
                            </Link>
                        </Breadcrumbs>
                    </div> */}

                    <Typography variant="h4">
                        {product.name}
                    </Typography>
                </Grid>
                {/* <Grid xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button size="small" variant="outlined" onClick={handleWishlist} startIcon={<FavoriteBorderOutlined />}>
                        Add to Wishlist
                    </Button>
                </Grid> */}
            </Grid>
            {/* <Grid container sx={{ alignItems: 'center' }}>
                <ProductRating rating={product.rating} />
                <Typography variant='caption' color='textSecondary'>
                    ({product.rating}) 1.2k Reviews
                </Typography>
            </Grid> */}

            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant='h5'>
                    <span>Nrs. {product.discountedPrice}</span> <span className='line-through text-sm text-slate-500'>Nrs. {product.price}</span>
                </Typography>
            </Box>
            <hr />
            <Typography variant="h6">
                {product.shortDescription}
            </Typography>
            <div
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
            {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                <Typography variant="h6">
                    Color {color}
                </Typography>
                <ToggleButtonGroup
                    value={color}
                    exclusive
                    onChange={handleColor}
                    aria-label="color select"
                    size='large'
                >
                    <ToggleButton value="Red" aria-label="red">
                        <Button variant="contained" color='warning' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                    <ToggleButton value="Green" aria-label="green">
                        <Button variant="contained" color='success' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                    <ToggleButton value="Blue" aria-label="blue">
                        <Button variant="contained" color='primary' sx={{ height: 40, width: 20 }}></Button>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography variant="h6">
                    Size {size}
                </Typography>
                <ToggleButtonGroup
                    value={size}
                    exclusive
                    onChange={handleSize}
                    aria-label="size select"
                    size='large'
                >
                    <ToggleButton value="Small" aria-label="small">
                        S
                    </ToggleButton>
                    <ToggleButton value="Medium" aria-label="medium">
                        M
                    </ToggleButton>
                    <ToggleButton value="Large" aria-label="large">
                        L
                    </ToggleButton>
                    <ToggleButton value="Extra Large" aria-label="extra large">
                        XL
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box> */}
            {/* <ChooseVariant type="Color" /> */}
            <Grid container sx={{ mt: 3, display: 'flex', gap: 5 }}>
                <Button variant='outlined' color='success' sx={{ flexGrow: '1' }} onClick={handleClickOpen}>Buy Now</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth="xs"
                >
                    <DialogTitle>Fill For Order</DialogTitle>
                    <DialogContent >
                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            m='auto'
                            // width="fit-content"
                            // onSubmit={handleSubmit(onSubmit)}
                            action={formAction}
                        >
                            <FormControl sx={{ mt: 2 }}>
                                <TextField type="hidden" label="" variant="outlined" {...register("productId")} />
                                <Grid sx={{ my: 3 }}>
                                    {errors.fullName && <span>{errors.fullName.message}</span>}
                                    <TextField label="Full Name" variant="outlined" {...register("fullName")} />
                                </Grid>
                                <Grid sx={{ mb: 3 }}>
                                    {errors.email && <span>{errors.email.message}</span>}
                                    <TextField label="email" variant="outlined" {...register("email")} />
                                </Grid>
                                <Grid sx={{ mb: 3 }}>
                                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                                    <TextField label="Phone Number" variant="outlined" {...register("phoneNumber")} />
                                </Grid>
                                <Grid sx={{ mb: 3 }}>
                                    {errors.fullAddress && <span>{errors.fullAddress.message}</span>}
                                    <TextField label="Full Address" variant="outlined" {...register("fullAddress")} />
                                </Grid>
                                <Grid sx={{ mb: 3 }}>
                                    {errors.message && <span>{errors.message.message}</span>}
                                    <TextField multiline rows={4} label="Message" variant="outlined" {...register("message")} />
                                </Grid>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid >
    )
}
