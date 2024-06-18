'use server';
import { NextRequest } from 'next/server'
import prisma from "app/lib/prisma"

export const readItem = async ({searchParams}) => {
    // const productData = await prisma.product.findMany()
    console.log(searchParams.query)
    const response = await fetch(process.env.ROOT_URL + "/api/searchProduct", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await response.json()
}
export const readAbout = async () => {
    try {
        const aboutData = await prisma.about.findMany()
        return aboutData;
    } catch (error) {
        console.log(error);
    }
}

export const readCategory = async () => {
    try {
        const categoryData = await prisma.category.findMany()
        return categoryData;
    } catch (error) {
        return error
    }
}