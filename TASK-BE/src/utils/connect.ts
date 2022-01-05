/**
 * Database connection logic
 */

//Dependencies
import { createConnection } from "typeorm";
import dotenv from 'dotenv'

dotenv.config()

export const connectToDb = async () => {
    try {
        await createConnection();
        console.log('Database connection successfull')
    } catch (error: any) {
        console.error(error)
        throw new Error('Error connecting')
    }
}

