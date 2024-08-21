import { Metadata } from "next"
export const metadata:Metadata = {
    title: {
        template: '%s | Authentication',
        default: 'Auth'
    },
    description: 'The NFC Authentication'
}

export default function accountLayout({ children }:any) {
    return (
        <div>
            {children}
        </div>
    )
}