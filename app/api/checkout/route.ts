import prisma from "@app/lib/prisma";

export async function POST(request: Request){
    const body = await request.json();
    const {contact, deliveryCountry, shippingAddress, shippingCost, paymentMethod, billingAddress} = body;
    const checkout = await prisma.checkoutOrder.create({
        data: {
            contact,
            deliveryCountry,
            shippingAddress,
            shippingCost,
            paymentMethod,
            billingAddress
        }
    })
    // return something
    return Response.json({});
}
