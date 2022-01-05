/**
 * User data schema logic 
 */

//Dependencies
import { object, string, TypeOf } from 'zod';

//Create the user reg payload
const regPayload = {
	body: object({
		userName: string({
			required_error: 'Username is required',
		}).min(3, 'Minimum of 3 charcters'),
		email: string({
			required_error: 'Email is required',
		}).email('Invalid email'),
		password: string({
			required_error: 'Password is required',
		}).min(6, 'Password must be at least 6 characters'),
	}),
};

//user login payload
const loginPayload = {
	body: object({
		email: string({
			required_error: 'Email is required',
		}).email('Invalid email'),
        password: string({
            required_error: 'Password is required'
        }).min(6,'Password must be at least 6 characters'),
	}),
};

//user params
const params = {
	params: object({
		userId: string({
			required_error: 'User id is required',
		}).uuid(),
	}),
};


//Create the schemas
//Register user
export const createUserSchema = object({
    ...regPayload
})

//User login
export const loginUserSchema = object({
    ...loginPayload
})

//Update user
export const updateUserSchema = object({
    ...regPayload,
    ...params
})

//Delete user
export const deleteUserSchema = object({
    ...params
})

//Get user
export const getUserSchema = object({
    ...params
})

//Create the types 
export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>
export type GetUserInput = TypeOf<typeof getUserSchema>

