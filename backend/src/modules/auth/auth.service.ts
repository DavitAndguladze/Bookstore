import { validatePassword } from './auth.validation';
import { findUserByEmail, createUser } from './auth.repository';
import { hashPassword, comparePassword } from '../../shared/utils/password.utils';
import { generateToken } from '../../shared/utils/jwt.utils';
import { AppError } from '../../shared/middleware/error.middleware';
import { RegisterRequestBody, LoginRequestBody } from '../../shared/types/auth.types';

export const register = async (data: RegisterRequestBody) => {
    
    validatePassword(data.password);
    
    const emailExist =  await findUserByEmail(data.email);
    if (emailExist) {
         throw new AppError(409, "Email already in use");
    }
    const hashed = await hashPassword(data.password);

    const user = await createUser({email: data.email, passwordHash: hashed, firstName: data.firstName, lastName: data.lastName })
    
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })

    return {
        token, 
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    }
}

export const login = async (data: LoginRequestBody) => {
    const user = await findUserByEmail(data.email);
    if (!user) {
        throw new AppError(401, "Invalid credentials")
    }
    
    if (!user.isActive) {
        throw new AppError(403, "Account is deactivated!");
    }
    
    const isMatch = await comparePassword(data.password, user.passwordHash);
    if (!isMatch) {
        throw new AppError(401, "Invalid credentials")
    }

    const token = generateToken({
       userId: user.id,
       email: user.email,
       role: user.role
    });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    }
}