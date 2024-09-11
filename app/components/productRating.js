'use client'
import Rating from "@mui/material/Rating";
import {useState} from "react"
export default function ProductRating() {
    const [value, setValue] = useState(3)
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