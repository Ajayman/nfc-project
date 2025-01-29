import { Metadata } from "next"

export const metadata:Metadata = {
    title: {
        template: '%s | Product',
        default: 'Product'
    },
    description: 'The Product Page'
}

export default function ProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>{children}</div>
    )
}