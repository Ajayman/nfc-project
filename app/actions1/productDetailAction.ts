export default async function fetchData(productId) {
    const res = await fetch(process.env.ROOT_URL + `/api/products/${productId}`,{
        method: "GET",
        cache: "force-cache"
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}