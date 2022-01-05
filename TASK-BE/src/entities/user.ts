/**
 * User model 
 */

//Dependencies
import bcrypt from 'bcrypt';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Tasks } from './tast';

//Create the user class
@Entity('User')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') user_id: string;

	@Column({})
	user_name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({})
	password: string;

	@CreateDateColumn() created_at: Date;

	@UpdateDateColumn() updated_at: Date;

	@OneToMany((type) => Tasks, (task) => task.task_owner)
	tasks: Tasks[];

	@BeforeInsert()
	hashPassword = async () => {
		this.password = bcrypt.hashSync(this.password, 10);
	};

	comparePassword = async (unencryptedString: string) => {
		return bcrypt.compareSync(unencryptedString, this.password);
	};
}
