/**
 * Task controller logic 
 */

//Depenedencies
import { Request, Response } from "express";
import { CreateTaskInput, DeleteTaskInput, GetTaskInput, UpdateTaskInput } from "../schema/tasks.schema";
import { createTask, deleteTask, findTask, getUserTasks, updateTask } from "../services/task.service";
import { findUser } from "../services/user.service";

//Create task handler
export const createTaskHandler = async (req: Request<{}, {}, CreateTaskInput['body']>, res: Response) => {
    try {
        //Extract the user from the res locals 
        const { userId } = res.locals.user

        //Look up for the user by id 
        const user = await findUser(userId)

        if (!user) {
            return res.status(401).json({ status: 'FAILED', msg: 'The user does not exist' })
        }

        //Create the task
        const task = await createTask({ ...req.body, owner: user })
        return res.status(201).json({ status: 'SUCCESS', msg: 'Task created', data: task })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Get all task handler
export const getAllTaskHandler = async (req: Request, res: Response) => {
    try {
        //Get the userId from the res.locals
        const { userId } = res.locals.user

        //Get the task belonging to that user 
        const tasks = await getUserTasks(userId)
        // if (tasks.length === 0) {
        //     return res.status(200).json({ status: 'SUCCESS', msg: 'No tasks added' })
        // }
        return res.status(200).json({ status: 'SUCCESS', msg: `A total of ${tasks.length} tasks created`, data: tasks })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Get a task handler
export const getTaskHandler = async (req: Request<GetTaskInput['params']>, res: Response) => {
    try {
        //Get the task id 
        const { id } = req.params

        //Look up for the task 
        const task = await findTask(id)
        if (!task) {
            return res.status(404).json({ status: 'FAILED', msg: 'Task not found' })
        }
        return res.status(200).json({ msg: task })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Update task handler
export const updateTaskHandler = async (req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>, res: Response) => {
    try {
        //Get the body
        const { completed } = req.body

        //Get the params
        const { id } = req.params

        //Update the task 
        const taskUpdate = await updateTask(id, completed)
        if (taskUpdate?.affected === 0) {
            return res.status(200).json({ status: 'SUCCESS', msg: 'No update was made' })
        }
        return res.status(201).json({ status: 'SUCCESS', msg: 'Task updated successfully' })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}

//Create task handler
export const deleteTaskHandler = async (req: Request<DeleteTaskInput['params']>, res: Response) => {
    try {
        //Grab the task id
        const { id } = req.params

        //Delete the task 
        const deleted = await deleteTask(id)
        if (deleted.affected === 0) {
            return res
                .status(404)
                .json({ status: 'FAILED', msg: 'The specified Task does not exist' })
        }
        return res
            .status(200)
            .json({ status: 'SUCCESS', msg: 'Task deleted successfully' })
    } catch (error: any) {
        return res.status(401).json({ status: 'FAILED', msg: error.message })
    }
}