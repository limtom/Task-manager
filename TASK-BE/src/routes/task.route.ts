/**
 * Task route logic 
 */

//Dependencies
import express from 'express';
import {
	createTaskHandler,
	deleteTaskHandler,
	getAllTaskHandler,
	getTaskHandler,
	updateTaskHandler,
} from '../controllers/task.controller';
import { auth } from '../middleware/auth';
import { validateSchema } from '../middleware/validateResource';
import { createTaskSchema, deleteTaskSchema, getTaskSchema, updateTaskSchema } from '../schema/tasks.schema';

//Create the router
const router = express.Router();

//Create Task
router.post('/tasks', auth, validateSchema(createTaskSchema), createTaskHandler);

//Get all task
router.get('/tasks', auth, getAllTaskHandler);

//Get a task
router.get('/tasks/:id', auth, validateSchema(getTaskSchema), getTaskHandler);

//Update a task
router.patch('/tasks/:id', auth, validateSchema(updateTaskSchema), updateTaskHandler);

//Delete a task
router.delete('/tasks/:id', auth, validateSchema(deleteTaskSchema), deleteTaskHandler);

//Export the router
export { router as taskRouter };
