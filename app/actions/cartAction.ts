'use server'

export default async function CartAdd(id: string, qty: number, user_id, string) {
    const cartData = Object.fromEntries({id: id, quantity: qty, user_id});
    const response = await fetch(process.env.ROOT_URL + "/api/admin/cart/cartitem",{
         method: "POST",
         headers:{
            "Content-Type": "application/json"
         },
         body: JSON.stringify(cartData)
    })
    const json = await response.json()
}