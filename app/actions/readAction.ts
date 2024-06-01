'use server';
import prisma from "app/lib/prisma"

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