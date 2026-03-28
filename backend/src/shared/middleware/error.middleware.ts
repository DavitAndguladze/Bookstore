import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(public statusCode: number, message: string){
        super(message);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        res.status(err.statusCode).json({ message: err.message })
    } else {
        console.error(err);
        res.status(500).json({message: "Internal server error "})
    }
}