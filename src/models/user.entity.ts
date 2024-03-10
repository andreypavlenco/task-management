import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from './taskList.entity';

@Entity('user')
export class User {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  email: string;

  @IsString()
  @Column({ select: false })
  password: string;

  @OneToMany(() => TaskList, (taskList) => taskList.user)
  @JoinColumn({ name: 'user_id' })
  taskList: TaskList[];
}
