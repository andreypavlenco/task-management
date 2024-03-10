import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'src/models/taskList.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { TaskItemService } from '../taskItem/taskItem.service';
import { createTaskListDTO } from './dto';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList) private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly taskItemService: TaskItemService
  ) {}

  async createTaskList(dto: createTaskListDTO, userId: number) {
    const taskList = new TaskList();
    taskList.name = dto.name;
    taskList.taskItem = await this.taskItemService.createTaskItem(
      dto.taskItems,
    );
    (taskList.user = await this.userRepository.findOne({
      select: { id: true, name: true },
      where: { id: userId },
    })),
      await this.taskListRepository.save(taskList);
    return taskList;
  }

  async findAllTaskList(userId: number) {
    const userAllList = await this.userRepository.findOne({
      relations: { taskList: { taskItem: true } },
      where: { id: userId },
    });

    if (userAllList) {
      return userAllList.taskList;
    } else {
      return [];
    }
  }

  async findOneTaskList(userId: number, taskListId: number) {
    const taskOneList = await this.userRepository.findOne({
      select:{name:true,email:true, id:true},
      relations: { taskList: { taskItem: true } },
      where: { id: userId, taskList: { taskItem: { id: taskListId } } },
    });

    if (taskOneList) {
      return taskOneList.taskList;
    } else {
    
      return [];
    }
  }

  async updateTaskList(id: number, updateName: string) {
    return await this.taskListRepository.update({ id }, { name: updateName });
  }

  
  async deleteTaskListAllItems(idTaskList: number) {
    try {
    const taskList =  await this.taskListRepository.findOne({where:{id: idTaskList}})
    
        
      return await this.taskItemService.deleteTaskItems(taskList);
    } catch (error) {
      return error;
    }
  }

  async deleteTaskListAllList(idTaskList: number) {
    try {
    const taskList =  await this.taskListRepository.findOne({where:{id: idTaskList}})
         await this.taskItemService.deleteTaskItems(taskList);
         return await this.taskListRepository.delete(idTaskList)
    } catch (error) {
      return error;
    }
  }
}
