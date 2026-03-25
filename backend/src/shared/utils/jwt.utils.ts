import env from "../../config/env"
import { JwtPayload } from '../types/auth.types';
import jwt from "jsonwebtoken";

export const generateToken = (payload:JwtPayload): string => {
    const secret = env.JWT_SECRET;
    const expires = env.JWT_EXPIRES_IN;
    const tokenPayload = {
        userId: payload.userId.toString(),
        email: payload.email,
        role: payload.role
    }

    const token = jwt.sign(tokenPayload, secret as jwt.Secret,{
        expiresIn: expires
    } as jwt.SignOptions)
    return token;
}

export const verifyToken = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, env.JWT_SECRET as jwt.Secret) as {userId: string; email: string; role:string };
    return {
        userId: BigInt(decoded.userId),
        email: decoded.email,
        role: decoded.role,
    }
}