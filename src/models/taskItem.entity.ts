import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from './taskList.entity';

@Entity('task_item')
export class TaskItem {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  description: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.taskItem)
  @JoinColumn({ name: 'list_id' })
  taskList: TaskList;
}
