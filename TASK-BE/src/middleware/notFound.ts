/**
 * Not found route 
 */

//Dependencies
import { Request, Response, NextFunction } from 'express';

export const notFound = async (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('Route not found');
};
