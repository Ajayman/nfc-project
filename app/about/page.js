async function getData() {
    const res = await fetch('https://my-json-server.typicode.com/typicode/demo/posts')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function AboutPage() {
    const apiData = await getData();
    return (
        <>
            <h2>This is a About Page</h2>
            {JSON.stringify(apiData)}
        </>
    )
}
