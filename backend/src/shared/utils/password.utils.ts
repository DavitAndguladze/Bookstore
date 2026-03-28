import bcrypt from "bcrypt"

const saltRounds = 12;
export const hashPassword = async (password:string) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export const comparePassword = async ( password: string, hash: string ) => {
    return await bcrypt.compare(password, hash);
}