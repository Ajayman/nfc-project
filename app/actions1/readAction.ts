'use server';

import prisma from "app/lib/prisma"
// type productData = {
//     id: string;
//     name: string;
//     imageUrl: string;
//     price: string;
//     title: string;
//     description: string;
//     category: string;
//     productType: string;
// }
export const readItem = async()=>{
    try {
        const productData = await prisma.product.findMany()
        return productData;
    } catch (error) {
     console.log(error);   
    }
}

export const readAbout = async()=> {
    try{
        const aboutData = await prisma.about.findMany()
        return aboutData;
    }catch(error){
        console.log(error);
    }
}

export const readCategory = async()=> {
    try{
        const categoryData = await prisma.category.findMany()
        return categoryData;
    }catch(error){
        return error
    }
}