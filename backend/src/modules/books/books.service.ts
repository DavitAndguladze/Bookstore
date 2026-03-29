import * as BookRepository from './books.repository';
import { AppError } from '../../shared/middleware/error.middleware';
import { Prisma } from '../../generated/prisma';

export const getAllBooks = async () => {
    const books = await BookRepository.findAllBooks();
    return books.map((book) => ({ ...book, id: book.id.toString() }));
}

export  const getBookById = async (id: bigint) => {
    const bookById = await BookRepository.findBookById(id);
    if (!bookById) throw new AppError(404, 'Book not found');

    return {
        ...bookById, id: bookById.id.toString()
    };
}

export const createBook = async (data: { 
    title: string,
    author: string,
    publisher: string,
    description: string,
    bookImageUrl: string,
    productType: 'PHYSICAL' | 'DIGITAL';
    price: Prisma.Decimal; 
}) => {
    const book = await BookRepository.createBook(data);

    return{
        ...book, id: book.id.toString()
    }
}

export const updateBook = async (id: bigint, data: Partial<{
    title: string;
    author: string;
    publisher: string;
    description: string;
    bookImageUrl: string;
    productType: 'PHYSICAL' | 'DIGITAL';
    price: Prisma.Decimal;
}>) => {
    try {
        const book = await BookRepository.updateBook(id, data);
        return { ...book, id: book.id.toString() };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new AppError(404, "Book not found");
        }
        throw error;
    }
}

export const deleteBook = async (id: bigint) => {
    try {
        await BookRepository.deleteBook(id);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new AppError(404, 'Book not found');
        }
        throw error;
    }
}