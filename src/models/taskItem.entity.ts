import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskList } from './taskList.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task_item')
export class TaskItem {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @IsString()
  @Column()
  description: string;

  @ApiProperty({ type: () => TaskList })
  @ManyToOne(() => TaskList, (taskList) => taskList.taskItem)
  @JoinColumn({ name: 'list_id' })
  taskList: TaskList;
}
