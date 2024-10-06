'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { checkOutSchema } from "../lib/schemas";
import { z } from "zod";
import { createCheckOutAction } from "../lib/actions";

type Inputs = z.infer<typeof checkOutSchema>
export default function CheckOutProduct() {
    const [deliveryCountry, setDeliveryCountry] = useState('Nepal')
    const [shippingCost, setShippingCost] = useState('100')
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [data, setData] = useState<Inputs>()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(checkOutSchema) })
    const processForm: SubmitHandler<Inputs> = async data => {
        const result = await createCheckOutAction(data)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setDeliveryCountry(event.target.value as string)
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(processForm)}
        >
            <Grid container direction="column" alignContent="center" spacing={1}>
                <Grid>
                    <Typography variant="h6">
                        Contact
                    </Typography>
                </Grid>
                <Grid >
                    <TextField id="outlined-basic" label="Email or Phone Number" variant="outlined" {...register("contact")} />
                    {errors.contact && <p>{errors.contact.message}</p>}
                </Grid>
                <Grid>
                    <FormControl>
                        <InputLabel variant="standard" id="select-country-label">
                            Select Country
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            id="select-country"
                            label="Country"
                            value={"Nepal"}
                            {...register("deliveryCountry")}
                        >
                            <MenuItem value={"Nepal"}>Nepal</MenuItem>
                            <MenuItem value={"Outside Nepal"}>Outside Nepal</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.deliveryCountry && <p>{errors.deliveryCountry.message}</p>}
                </Grid>
                <Grid>
                    <Typography variant="h6">
                        Shipping Detail
                    </Typography>
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="First Name" variant="outlined"  {...register("shippingAddress.firstName")} />
                    {errors?.shippingAddress?.firstName && <p>{errors?.shippingAddress?.firstName.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Last Name" variant="outlined"  {...register("shippingAddress.lastName")} />
                    {errors?.shippingAddress?.lastName && <p>{errors?.shippingAddress.lastName.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Address" variant="outlined"  {...register("shippingAddress.address")} />
                    {errors?.shippingAddress?.address && <p>{errors?.shippingAddress?.address.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Nearest Landmark" variant="outlined"  {...register("shippingAddress.nearestLandmark")} />
                    {errors?.shippingAddress?.nearestLandmark && <p>{errors?.shippingAddress?.nearestLandmark.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="City" variant="outlined"  {...register("shippingAddress.city")} />
                    {errors?.shippingAddress?.city && <p>{errors?.shippingAddress?.city.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Phone Number" variant="outlined"  {...register("shippingAddress.phoneNumber")} />
                    {errors?.shippingAddress?.phoneNumber && <p>{errors.shippingAddress.phoneNumber.message}</p>}
                </Grid>
                <FormControl>
                    <FormLabel id="shipping-method">Shipping Method</FormLabel>
                    <RadioGroup
                        aria-labelledby="shipping-method"
                        defaultValue="100"
                        name="shippingCost"
                    // value={shippingCost}
                    // onChange={handleShippingMethod}
                    >
                        <FormControlLabel {...register("shippingCost")} value="100" control={<Radio />} label="Inside Valley Rs. 100" />
                        <FormControlLabel {...register("shippingCost")} value="150" control={<Radio />} label="Outside Valley Rs. 150" />
                    </RadioGroup>
                </FormControl>
                {errors.shippingCost && <p>{errors.shippingCost.message}</p>}
                <FormControl>
                    <FormLabel id="payment-method">Payment Method</FormLabel>
                    <RadioGroup
                        aria-labelledby="payment-method"
                        defaultValue="COD"
                        name="paymentMethod"
                    >
                        <FormControlLabel {...register("paymentMethod")} value="COD" control={<Radio />} label="Cash On Delivery(COD)" />
                        <FormControlLabel {...register("paymentMethod")} value="ESEWA" control={<Radio />} label="ESEWA" />
                    </RadioGroup>
                </FormControl>
                {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}
                <Grid>
                    <Typography variant="h6">
                        Billing Method
                    </Typography>
                </Grid>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="same"
                    {...register("billingAddress")}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="same" control={<Radio />} label="Same as Shipping Address" />
                    <FormControlLabel value="different" control={<Radio />} label="Different Billing Address" />
                </RadioGroup>
                <Grid>
                    <TextField id="standard-basic" label="First Name" variant="outlined"  {...register("billingAddress.firstName")} />
                    {errors?.billingAddress?.firstName && <p>{errors?.billingAddress?.firstName.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Last Name" variant="outlined"  {...register("billingAddress.lastName")} />
                    {errors?.billingAddress?.lastName && <p>{errors?.billingAddress?.lastName.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Address" variant="outlined"  {...register("billingAddress.address")} />
                    {errors?.billingAddress?.address && <p>{errors?.billingAddress?.address.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Nearest Landmark" variant="outlined"  {...register("billingAddress.nearestLandmark")} />
                    {errors?.billingAddress?.nearestLandmark && <p>{errors?.billingAddress?.nearestLandmark.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="City" variant="outlined"  {...register("billingAddress.city")} />
                    {errors?.billingAddress?.city && <p>{errors?.billingAddress?.city.message}</p>}
                </Grid>
                <Grid>
                    <TextField id="standard-basic" label="Phone Number" variant="outlined"  {...register("billingAddress.phoneNumber")} />
                    {errors?.billingAddress?.phoneNumber && <p>{errors?.billingAddress?.phoneNumber.message}</p>}
                </Grid>
                <Button variant="contained" type="submit">Submit</Button>
            </Grid>
        </Box>
    )
}