import { prisma } from "../../config/db";
import { Prisma } from "../../generated/prisma";

export const findAllBooks = async() => {
    return prisma.book.findMany({
        where: { visibility: 'PUBLISHED'}
    })
}

export const findBookById = async(id: bigint) => {
    return prisma.book.findUnique({
        where: { id }
    })
}

export const createBook = async(data: {
    title: string,
    author: string,
    publisher: string,
    isbn13: string,
    isbn10: string | null,
    description: string,
    bookImageUrl: string,
    productType: 'PHYSICAL' | 'DIGITAL';
    price: Prisma.Decimal;
}) => {
    return prisma.book.create({ data })
}

export const updateBook = async (id:bigint, data: Partial<{
    title: string;
    author: string;
    publisher: string;
    description: string;
    bookImageUrl: string;
    productType: 'PHYSICAL' | 'DIGITAL';
    price: Prisma.Decimal;
}>) => {
    return prisma.book.update({ where: { id }, data });
}

export const deleteBook = async (id:bigint) => {
    return prisma.book.delete({ where: { id } })
}