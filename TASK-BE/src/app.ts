/**
 * Major app logic 
 */

//Dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDb } from './utils/connect';
import { notFound } from './middleware/notFound';
import { taskRouter } from './routes/task.route';
import { authRouter } from './routes/auth.route';
import cookieParser from 'cookie-parser';

dotenv.config();
//Create the express app
const app = express();
const port = process.env.PORT || 5001;
const corsOptions = {
    credentials: true,
    origin:process.env.URL || 'http://localhost:3000'
}

//Global middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(cookieParser())

// app.get('/', (req, res) => {
//     res.send('Hello-world');
// });

//Route specific middlewre 
app.use('/api/v1/', taskRouter)
app.use('/api/v1/', authRouter)
app.use(notFound)

const init = async () => {
    try {
        //connect to Db
        await connectToDb();
        //Start the server and listen on port 5000
        app.listen(port, () => {
            console.log('Server started on port ' + port);
        });
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

//Start the app
init()
