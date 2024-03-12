import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { TaskItem } from './taskItem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task_list')
export class TaskList {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.taskList)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ type: () => [TaskItem] })
  @OneToMany(() => TaskItem, (TaskItem) => TaskItem.taskList)
  taskItem: TaskItem[];
}
