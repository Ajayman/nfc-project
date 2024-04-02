import {NextResponse} from "next/server";
import {products} from "app/products"

export async function GET(request: Request, context: any){
    const {params} = context;
    const product = products.filter(x=> params.productId === x.id.toString())
    return NextResponse.json({
        product
    })
}