import { prisma } from "../../config/db";
import { Prisma } from "../../generated/prisma";

export const findActiveCart = async (userId: bigint) => {
    return prisma.cart.findFirst({
        where: {userId, status: 'ACTIVE'},
        include: {
            cartItems: {
                include: { book: true }
            }
        }
    })
}

export const createCart = async (userId: bigint) => {
    return prisma.cart.create({
        data: {userId, status: 'ACTIVE'}
    })
}

export const findCartItemByBookId = async (cartId: bigint, bookId: bigint) => {
    return prisma.cartItem.findFirst({
        where: { cartId, bookId }
    })
}

export const findCartItem = async (itemId: bigint) => {
    return prisma.cartItem.findUnique({
        where: {id: itemId }
    })
}

export const createCartItem = async (cartId: bigint, bookId: bigint, quantity: number,priceAtAdded: Prisma.Decimal) => {
    return prisma.cartItem.create({
        data: {cartId, bookId, quantity, priceAtAdded}
    })
}

export const updateCartItem = async (itemId: bigint, quantity: number) => {
    return prisma.cartItem.update({
        where: {id: itemId},
        data: { quantity }
    })
}

export const deleteCartItem = async(itemId: bigint) => {
    return prisma.cartItem.delete({
         where: { id: itemId } 
    })
}