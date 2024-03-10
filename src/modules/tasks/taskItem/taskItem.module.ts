import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskItem } from 'src/models/taskItem.entity';
import { TaskItemService } from './taskItem.service';
import { TaskItemController } from './taskItem.controller';
import { TaskListModule } from '../taskList/taskList.module';
import { TaskList } from 'src/models/taskList.entity';
import { User } from 'src/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskItem, TaskList, User])],
  controllers: [TaskItemController],
  providers: [TaskItemService],
  exports: [TaskItemService]
})
export class TaskItemModule {}
