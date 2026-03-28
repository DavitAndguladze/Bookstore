import { Request, Response, NextFunction } from "express";
import { register, login } from './auth.service';

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const result = await register(req.body);
       res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await login(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}