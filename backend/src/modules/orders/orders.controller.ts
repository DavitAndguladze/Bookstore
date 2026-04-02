import { Request, Response, NextFunction } from "express";
import * as OrderService from "./orders.service";


export const placeOrderHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await OrderService.placeOrder(req.user!.userId);
        res.status(201).json(order);
    }   catch(error) {
        next(error);
    }         
}

export const getMyOrdersHandler =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderService.getMyOrders(req.user!.userId);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

export const getMyOrderByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await OrderService.getMyOrderById(req.user!.userId, BigInt(req.params.id as string));
        res.status(200).json(order);
    } catch(error) {
        next(error);
    }
}