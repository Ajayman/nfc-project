import {products} from "app/products"
import { NextResponse } from "next/server"

export async function GET(request){
    // return NextResponse.json(products);
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('query');
    const filteredProducts = products.filter((product)=> {
        return product.name.toLowerCase().includes(query.toLowerCase())
    })
    return NextResponse.json(filteredProducts);
}