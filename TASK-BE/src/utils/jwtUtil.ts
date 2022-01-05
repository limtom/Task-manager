/**
 * Token generation logic
 */

//Dependencies 
import jwt from 'jsonwebtoken'

//Create token
export const getTokens = async (userId: string, userName: string) => {
    const accessToken = jwt.sign({ userId, userName }, <string>process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refresToken = jwt.sign({userId, userName}, <string>process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' })
    return {
        accessToken,
        refresToken
    }
}

//Verify token 
export const verifytoken = async (token: string, secret:string) => {
    try {
        const decoded = jwt.verify(token, secret, { ignoreExpiration: true });
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}