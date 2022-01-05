/**
 * Task model
 */

//Dependencies
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

//Create the task class for the task table
@Entity('Task')
export class Tasks extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') task_id: string;

	@Column({})
	name: string;

	@Column({
		default: false,
	})
	completed: boolean;

	@CreateDateColumn() created_at: Date;

	@UpdateDateColumn() updated_at: Date;

	@ManyToOne((type) => User, (user) => user.tasks, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'task_owner' })
	task_owner: User;
}
