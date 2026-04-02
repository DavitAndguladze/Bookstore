import { prisma } from "../../config/db";
import { Prisma, CartStatus } from "../../generated/prisma/";


export const createOrder = async (userId: bigint, totalAmount: Prisma.Decimal) => {
    return prisma.order.create({
        data: {userId, status: 'PENDING', totalAmount}
    });
}

export const createOrderItem = async (orderId: bigint, bookId: bigint, title: string, price: Prisma.Decimal, quantity: number) => {
    return prisma.orderItem.create({
        data: {orderId, bookId, title, price, quantity}
    })
}

export const updateCartStatus = async (cartId: bigint, status: CartStatus) => {
    return prisma.cart.update({
        where: { id: cartId },
        data: { status }
    })
}

export const findOrderByUser = async (userId: bigint) => {
    return prisma.order.findMany({
        where: { userId },
        include: { orderItems: true }
    })
}

export const findOrderById = async (orderId: bigint) => {
    return prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: true }
    })
}
