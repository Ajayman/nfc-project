import { Metadata } from "next"
export const metadata: Metadata = {
    title: {
        template: '%s | Authentication',
        default: 'Auth'
    },
    description: 'The NFC Authentication'
}

export default function accountLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <h2>Dashboard</h2>
                {children}
            </body>
        </html>
    )
}