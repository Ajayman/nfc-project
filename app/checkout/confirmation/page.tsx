import Link from 'next/link'

export default function OrderConfirmation(){
    return(
        <div>
            Thank you for purchasing For more purchase <br/>
            <Link href="/products">More Products</Link>
        </div>
    )
}