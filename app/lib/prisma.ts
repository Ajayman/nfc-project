// import {PrismaClient} from '@prisma/client';

// let prisma: PrismaClient;

// export async function main(){
//     //code for Prisma Client queries here
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers)
// }


// main()
// .catch(async(e)=> {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async()=> {
//     await prisma.$disconnect()
// })

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
if(process.env.NODE_ENV === "production") {
prisma = new PrismaClient();
} else {
if(!global.prisma){
global.prisma = new PrismaClient()
}
prisma = global.prisma;
}
export default prisma;