export default function ProductSearch({ products }) {
    console.log(products);
    return (
        <>
        <h4>Product list page</h4>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}