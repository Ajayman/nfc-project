"use server"
export default async function cartItem() {
    const res = await fetch(process.env.ROOT_URL + "/api/admin/cart/cartitem")
    const data = await res.json();
    return data;
}