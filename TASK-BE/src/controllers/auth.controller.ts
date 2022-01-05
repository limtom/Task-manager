/**
 * Auth logic
 */

//Dependencies
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import { createUser, findUser, loginUser } from "../services/user.service";
import { getTokens, verifytoken } from "../utils/jwtUtil";

//Register a user
export const userSignupHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        //Extract reg info from the body
        const { userName, email, password } = req.body
        const user = await createUser({ userName, email, password })
        return res.status(201).json({ status: 'SUCCESS', msg: 'User created successfully', data: omit(user, ['password']) })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Register a user
export const userLoginHandler = async (req: Request<{}, {}, LoginUserInput['body']>, res: Response) => {
    try {
        //Extract login details from the body
        const { email, password } = req.body
        const user = await loginUser(email, password)
        if (user) {
            //Get the access token and refresh token 
            const tokens = await getTokens(user.user_id, user.user_name)

            //Set the refresh token as a cookie
            res.cookie('refresh_token', tokens.refresToken, { httpOnly: true, maxAge: (24 * 60 * 60 * 1000) * 365, path: '/' })
            return res.status(201).json({ status: 'SUCCESS', msg: 'User logged-in successfully', data: tokens })
        }
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Log the user out 
export const userLogoutHandler = async (req: Request, res: Response) => {
    try {
        //Delete the user from the cookies 
        res.cookie('refresh_token', '', { maxAge: 0, path: '/' })
        return res.status(200).json({ status: 'SUCCESS', msg: 'User logged out' })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Get the logged user
export const getUserHandler = async (req: Request, res: Response) => {
    try {
        //Grab the refresh token from the cookie
        const refreshToken = req.cookies.refresh_token

        //Verify the cookie 
        const result: any = jwt.verify(refreshToken, <string>process.env.REFRESH_TOKEN_SECRET)

        //Find the user by the id 
        const { userId } = result

        //Lookup for the user
        const user = await findUser(userId)
        return res.status(200).json({ status: 'SUCCESS', msg: omit(user, ['password']) })

    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}