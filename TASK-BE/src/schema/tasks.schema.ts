/**
 * Task schema logic
 */

import { boolean, object, string, TypeOf } from "zod";

//Create the task payload 
const payload = {
    body: object({
        name: string({
            required_error:'Name field required'
        }),
        completed:boolean().default(false)
    })
}

const editPayload = {
    body: object({
        completed:boolean()
    })
}

const params = {
    params: object({
        id: string({
            required_error:'Task id is required'
        }).uuid('Invalid uuid')
    })
}

//CreateTask schema
export const createTaskSchema = object({
    ...payload
})

//Edit task schema
export const updateTaskSchema = object({
    ...editPayload,
    ...params
})

//Delete task schema 
export const deleteTaskSchema = object({
    ...params
})

//Get task schema 
export const getTaskSchema = object({
    ...params
})

//Export the types
export type CreateTaskInput = TypeOf<typeof createTaskSchema>
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>
export type GetTaskInput = TypeOf<typeof getTaskSchema>
