/**
 * Authentication middleware
 */

//Dependncies
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { reIssueAccessToken } from "../services/user.service";
import { verifytoken } from "../utils/jwtUtil";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    //Grab the auth header
    const authHeader = req.headers['authorization']

    //Grab the access token
    const accessToken = authHeader && authHeader.split(' ')[1];

    //Grab the refresh token
    const refreshToken = req.cookies.refresh_token

    if (accessToken === null) {
        res.status(403).json({ msg: 'No jwt provided' })
    }

    //Verify the token 
    try {
        const jwtPayload = jwt.verify(<string>accessToken, <string>process.env.ACCESS_TOKEN_SECRET)
        //Set the payload on the response 
        res.locals.user = jwtPayload
    } catch (error: any) {
        if (error.message === 'jwt expired' && refreshToken) {
            //Generate new access token 
            const newAccessToken = await reIssueAccessToken(refreshToken)

            //Set accesstoken on the header 
            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken)
            }

            //Veriy and decode the token then add to the res headers
            const result = verifytoken(<string>newAccessToken, <string>process.env.ACCESS_TOKEN_SECRET)

            //Add
            res.locals.user = (await result).decoded
            return next()
        }
        res.status(403).json({ msg: error.message })
        return
    }
    next()

}