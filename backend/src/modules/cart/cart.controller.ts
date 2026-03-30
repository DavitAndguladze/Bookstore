import { Request, Response, NextFunction } from "express";
import * as CartService from './cart.service';

export const getCartHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cart = await CartService.getCart(req.user!.userId);
        res.status(200).json(cart);
    } catch(error) {
        next(error)
    }
}

export const addItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const bookId = BigInt(req.body.bookId);
        const { quantity } = req.body;
        const item = await CartService.addItem(userId, bookId, quantity);
        res.status(201).json(item);
    } catch(error) {
        next(error);
    }
}

export const updateItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const itemId = BigInt(req.params.itemId as string);
        const { quantity } = req.body;
        const item = await CartService.updateItem(userId, itemId, quantity);
        res.status(200).json(item);
    } catch(error) {
        next(error);
    }
}

export const removeItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const itemId = BigInt(req.params.itemId as string);
        await CartService.removeItem(userId, itemId);
        res.status(204).send();
    } catch(error) {
        next(error);
    }
}