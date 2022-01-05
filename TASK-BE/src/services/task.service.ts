/**
 * Task database logic
 */

import { orderBy } from 'lodash';
import { Tasks } from '../entities/tast';
import { User } from '../entities/user';

//Dependencies

//Task interface
interface Itask {
	name: string,
	completed: boolean,
	owner: User,
}

//Create task
export const createTask = async (taskObj: Itask) => {
	const task = Tasks.create({
		name: taskObj.name,
		completed: taskObj.completed,
		task_owner: taskObj.owner,
	});
	return await task.save();
};

//find task
export const findTask = async (taskId: string) => {
	const task = await Tasks.findOne({ where: { task_id: taskId } });
	return task;
};

//Get all task by user
export const getUserTasks = async (userId: string) => {
	const tasks = await Tasks.find({
		where: { task_owner: userId },
		order: {
			created_at: 'DESC',
		},
	});
	return tasks;
};

//Update task
export const updateTask = async (taskId: string, update: boolean) => {
	const task = Tasks.update(taskId, { completed: update });
	return task;
};

//Delete task
export const deleteTask = async (taskId: string) => {
	return Tasks.delete(taskId);
};
