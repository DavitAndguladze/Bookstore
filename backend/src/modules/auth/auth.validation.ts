import { AppError } from "../../shared/middleware/error.middleware";

export const validatePassword = (password:string): void => {
    const errors: string[] = [];

    if (password.length < 8 || password.length > 72) 
        errors.push("Password must be between 8 and 72 characters");

    if (password !== password.trim())
        errors.push("Password must not have leading or trailing spaces");

    if (!/[A-Z]/.test(password))
        errors.push("Password must include at least one uppercase letter");

    if (!/[a-z]/.test(password)) 
        errors.push("Password must include at least one lowercase letter");

    if (!/[0-9]/.test(password))
        errors.push("Password must include at least one number");

    if (!/[^a-zA-Z0-9]/.test(password)) 
        errors.push("Password must include at least one special character");

    if (errors.length > 0) throw new AppError(400, errors.join(", "));
};