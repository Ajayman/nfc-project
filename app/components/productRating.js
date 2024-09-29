'use client'
import Rating from "@mui/material/Rating";
import {useState} from "react"
export default function ProductRating({rating}) {
    const [value, setValue] = useState(rating)
    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    )
}