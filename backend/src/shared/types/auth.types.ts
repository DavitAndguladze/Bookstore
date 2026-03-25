export interface RegisterRequestBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface JwtPayload {
    userId: bigint;
    email: string;
    role: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}

