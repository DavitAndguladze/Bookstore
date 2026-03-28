import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AppError } from "./error.middleware";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.includes("Bearer ")) {
        throw new AppError(401, "No token provided!");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(error) 
    }
}

export const authorize =(...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new AppError(401, "User does not exist!");
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError(403, "Forbidden");
        }
        next()
    }
}