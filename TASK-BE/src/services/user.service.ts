/**
 * User service logic
 */
//Dependencies
import { User } from '../entities/user';
import { get, isEmpty } from 'lodash'
import jwt from 'jsonwebtoken'
import { getTokens } from '../utils/jwtUtil';

//Create the userType
interface Iuser {
	userName: string,
	email: string,
	password: string,
}

//Create a user
export const createUser = async (userObject: Iuser) => {
	//Look up for the user before creating
	try {
		const user = User.create({
			user_name: userObject.userName,
			email: userObject.email,
			password: userObject.password,
		});
		return await user.save();
	} catch (error) {
		throw new Error('Account with that user already exist');
	}
};

//login
export const loginUser = async (email: string, password: string) => {
	//lookup for the user by the email
	const user = await User.findOne({ where: { email: email } });
	if (isEmpty(user)) {
		throw new Error('The specified user does not exist')
	}
	//compare the password 
	const isPasswordValid = await user?.comparePassword(password)
	if (!isPasswordValid) {
		throw new Error('Emai or Password incorrect')
	}
	return user
};

//findUser 
export const findUser = async (id: string) => {
	const user = await User.findOne({ where: { user_id: id } })
	return user
}

//Reissue access token
export const reIssueAccessToken = async (refreshToken: string) => {
	//decode the refresh token
	const jwtPayload = jwt.verify(refreshToken, <string>process.env.REFRESH_TOKEN_SECRET);

	//Check if the payload is valid
	if (!jwtPayload) return false;

	//Look up for the user
	const user = await User.findOne({ where: { user_id: get(jwtPayload, 'userId') } });

	//If account does not exist
	if (!user) return false;

	//Generate a new access token
	const tokens = await getTokens(
		user.user_id,
		user.user_name
	);

	//return the access token
	return tokens.accessToken;
};