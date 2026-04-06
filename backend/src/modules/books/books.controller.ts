import { Request, Response, NextFunction } from "express";
import * as BooksService from './books.service';

export const getAllBooksHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, genre, minPrice, maxPrice } = req.query;
        const books = await BooksService.getAllBooks({
            title: title as string | undefined,
            author: author as string | undefined,
            genre: genre as string | undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

export const getBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = BigInt(req.params.id as string);
        const book = await BooksService.getBookById(id);
        res.status(200).json(book);
    } catch (error) {
        next(error)
    }
}

export const createBookHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BooksService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error)
    }
}

export const updateBookHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = BigInt(req.params.id as string);
        const book = await BooksService.updateBook(id, req.body);
        res.status(200).json(book);
    } catch (error) {
        next(error)
    }
}

export const deleteBookHandler = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id = BigInt(req.params.id as string);
        await BooksService.deleteBook(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}