import {NextResponse} from "next/server";
import {products} from "app/products"

export async function GET(request: Request, context: any){
    const {params} = context;
    
    return NextResponse.json({
        product:products.find((x:any)=> params.productId === x.id.toString())
    })
}