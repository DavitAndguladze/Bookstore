import { prisma } from "../../config/db"

export const findUserByEmail= async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    })
}

export const createUser = async (
    data: {
        email:string;
        passwordHash: string;
        firstName: string;
        lastName: string;
    }
) => {
    return prisma.user.create({
        data: {
            ...data,
            role: "customer"
        }
    })
}