'use server'
import { cookies } from 'next/headers'
import prisma from "app/lib/prisma"
import { contactSchema } from './schemas'
import { loginSchema } from './schemas'
import {z} from 'zod'
type Inputs = z.infer<typeof contactSchema>
export async function formContactAction(formData:Inputs) {
    const parsed = contactSchema.safeParse(formData)
    if (parsed.success) {
        const rawFormData = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            comment: formData.comment
        }
        const res = await fetch(process.env.ROOT_URL + "/api/contact", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawFormData)
        })

        const json = await res.json()

        // // Redirect to login success page
        if (res.ok) {
            return { message: "Submission successful" }
        } else {
            return json.error
        }
    }
    if (parsed.error) {
        return { success: false, error: parsed.error.format() }
    }
}

export async function getCookie(name: string) {
    const cookieStore = cookies();
    const theme = cookieStore.get(name);
    return theme;
}
// export async function CartAdd(id: string, qty: number, user_id, string) {
//     const cartData = Object.fromEntries({ id, quantity: qty, user_id });
//     const response = await fetch(process.env.ROOT_URL + "/api/admin/cart/cartitem", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(cartData)
//     })
//     const json = await response.json()
// }

export async function fetchData(productId) {
    const res = await fetch(process.env.ROOT_URL + `/api/products/${productId}`, {
        method: "GET",
        cache: "force-cache"
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export const readItem = async () => {
    try {
        const productData = await prisma.product.findMany()
        return productData;
    } catch (error) {
        console.log(error);
    }
}

export const readAbout = async () => {
    try {
        const aboutData = await prisma.about.findMany()
        return aboutData;
    } catch (error) {
        console.log(error);
    }
}

export const readCategory = async () => {
    try {
        const categoryData = await prisma.category.findMany()
        return categoryData;
    } catch (error) {
        return error
    }
}


export async function loginAction(formData: FormData) {
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email')
    })

    if (!validatedFields.success) {
        return {
            errors: "Error in Email"
        }
    }
    // const user = await signIn(formData)
}

// export async function signIn(formData:FormData){
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const res = await fetch(process.env.ROOT_URL + "/api/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password })
//     })
// }
// export const authenticate = async (prevState: string | undefined, formData: FormData) => {
//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid credentials.';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
// }