import { prisma } from "../../config/db";
import { Prisma } from "../../generated/prisma";

export const findAllBooks = async(filters: {
    title?: string;
    author?: string;
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
}) => {
    return prisma.book.findMany({
        where: {
            visibility: 'PUBLISHED',
            title: filters.title ? { contains: filters.title, mode: 'insensitive'} : undefined,
            author: filters.author ? {contains: filters.author, mode: 'insensitive'} : undefined,
            bookGenres: filters.genre ? {
                some: {
                    genre: { name: filters.genre }
                } 
            } : undefined,
            price: {
                gte: filters.minPrice ? new Prisma.Decimal(filters.minPrice) : undefined,
                lte: filters.maxPrice ? new Prisma.Decimal(filters.maxPrice) : undefined,
            }
        }
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