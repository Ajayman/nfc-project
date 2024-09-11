type VisibilityProps = {
    display: string
}
export default function DetailDescription({display}: VisibilityProps) {
    return (
        <div style={{display}}>
            <p className="mb-0">Dear customer,</p><br />
            <p className="text-lg mt-0">
                I hope this product feels like a warm hug to you.
                I made this product for the ones who feel everything too deeply. You’re right,
                I made this product for you.
            </p><br />
            <p className="text-lg mt-0">
                This product was meant to find you if you’ve ever loved someone who didn’t love you back.
                If you’ve ever overinvested in the wrong people. If you have a hard time letting go.
            </p>

        </div>
    )
}