import { Typography } from "@mui/material"
export default function ProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div><Typography variant="h4">Product Layout</Typography>
            <div>{children}</div>
        </div>
    )
}