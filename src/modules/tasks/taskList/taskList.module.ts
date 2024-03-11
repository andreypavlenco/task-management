import { TaskListService } from './taskList.service';
import { TaskListController } from './taskList.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from 'src/models/taskList.entity';
import { TaskItem } from 'src/models/taskItem.entity';
import { User } from 'src/models/user.entity';
import { TaskItemModule } from '../taskItem/taskItem.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskList, TaskItem, User]),
    TaskItemModule,
  ],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
