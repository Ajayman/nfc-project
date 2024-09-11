'use server'
import { cookies } from 'next/headers'
import prisma from "app/lib/prisma"
import { contactSchema, registerSchema } from './schemas'
import { loginSchema } from './schemas'
import { redirect } from "next/navigation"
import { UserProvider } from "app/context/user"
import { z } from 'zod'

type Inputs = z.infer<typeof contactSchema>
export async function formContactAction(formData: Inputs) {
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

type loginInputs = z.infer<typeof loginSchema>
export async function loginUserAction(formData: loginInputs) {
    const parsed = loginSchema.safeParse(formData)
    console.log(parsed)
    // Get the data off the form
    if (!parsed.success) {
        return { success: false, error: parsed.error.format() }
    }
    else {

        const rawFormData = {
            email: formData.email,
            password: formData.password
        }
        const res = await fetch(process.env.ROOT_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawFormData)
        })
        const json = await res.json();
        cookies().set("Authorization", json.token, {
            httpOnly: true,
            expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
            path: "/",
            sameSite: "strict"
        })
        // Redirect to login if success
        if (res.ok) {
            UserProvider(json.user)
            redirect("/");
        }
    }
}


export async function getCookie(name: string) {
    const cookieStore = cookies();
    const theme = cookieStore.get(name);
    return theme;
}

export async function CartAdd(id: string, qty: number, user_id, string) {
    const cartData = Object.fromEntries({ id, quantity: qty, user_id });
    const response = await fetch(process.env.ROOT_URL + "/api/admin/cart/cartitem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartData)
    })
    const json = await response.json()
}

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
const ITEMS_PER_PAGE = 10;
export const fetchProducts = async () => {
    try {
        const products = await prisma.product.findMany()
        return products;
    } catch (error) {
        console.log(error);
    }
}

export const fetchProductsPage = async (query: string) => {
    try {
        const count = await prisma.product.count({
            where:{
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        }
        )
        const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.log(error);
    }
}

export const fetchFilteredProducts = async (query: string, currentPage: number)=>{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    try {
        const products = await prisma.product.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        }
        )
        console.log(products);
        return products;
    } catch(error) {
        console.log('Database Error', error)
        throw new Error('Failed to fetch invoices.');
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

export const readFiltered = async()=> {
    try{
        const filteredProduct = await prisma.product.findMany({
            where: {
                productType: {
                    equals: 'New'
                }
            }

        })
        return filteredProduct
    }catch(error){
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

type registerInputs = z.infer<typeof registerSchema>
export async function CreateUserAction(data: registerInputs) {
    const parsed = registerSchema.safeParse(data) //validation happens even in the server too
    if (parsed.success) {
        const rawFormData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            age: data.age,
            password: data.password
        } //converts into regular javascript object by Object.fromEntries
        //send to our api route
        const res = await fetch(process.env.ROOT_URL + "/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawFormData)
        })

        const json = await res.json();
        // Redirect to login if success
        if (res.ok) {
            redirect("/login");
        } else {
            return json.error;
        }
    }
    if (parsed.error) {
        return {
            message: "Invalid Form Data"
        }
    }


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