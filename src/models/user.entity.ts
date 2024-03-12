import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskList } from './taskList.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ select: false })
  password: string;

  @ApiProperty({ type: () => [TaskList] })
  @OneToMany(() => TaskList, (taskList) => taskList.user)
  @JoinColumn({ name: 'user_id' })
  taskList: TaskList[];
}
