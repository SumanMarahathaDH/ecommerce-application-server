import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const SALT_ROUNDS = 10
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const compareToken = async (token, hashedToken) => {
    return await bcrypt.compare(token, hashedToken)
}