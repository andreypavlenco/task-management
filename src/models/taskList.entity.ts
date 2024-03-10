import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TaskItem } from './taskItem.entity';

@Entity('task_list')
export class TaskList {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.taskList)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TaskItem, (TaskItem) => TaskItem.taskList)
  taskItem: TaskItem[];
}
