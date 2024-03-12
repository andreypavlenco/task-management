import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'src/models/taskList.entity';
import { TaskItemService } from '../taskItem/taskItem.service';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { createTaskListDTO } from './dto';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly taskItemService: TaskItemService,
  ) {}

  async createTaskList(dto: createTaskListDTO, userId: number) {
    const taskList = new TaskList();
    taskList.name = dto.name;
    try {
      taskList.taskItem = await this.taskItemService.createTaskItem(dto.taskItems);
      (taskList.user = await this.userRepository.findOne({
        select: { id: true, name: true },
        where: { id: userId },
      })),
        await this.taskListRepository.save(taskList);
      return taskList;
    } catch (error) {
      return new BadRequestException('Error save Task');
    }
  }

  async findAllTaskList(userId: number) {
    try {
      const userAllList = await this.userRepository.findOne({
        relations: { taskList: { taskItem: true } },
        where: { id: userId },
      });

      if (userAllList) {
        return userAllList.taskList;
      } else {
        throw new BadRequestException('Not Task List');
      }
    } catch (error) {
      throw new BadRequestException('Not Task List', error);
    }
  }

  async findOneTaskList(userId: number, taskListId: number) {
    try {
      const taskOneList = await this.userRepository.findOne({
        select: { name: true, email: true, id: true },
        relations: { taskList: { taskItem: true } },
        where: { id: userId, taskList: { taskItem: { id: taskListId } } },
      });

      if (taskOneList) {
        return taskOneList.taskList;
      } else {
        throw new BadRequestException('Not Task List');
      }
    } catch (error) {
      throw new BadRequestException('Not Task List', error);
    }
  }

  async updateTaskList(id: number, updateName: string) {
    try {
      return await this.taskListRepository.update({ id }, { name: updateName });
    } catch (erro) {
      throw new BadRequestException('Not update Task List');
    }
  }

  async deleteTaskListAllItems(taskListId: number) {
    try {
      const taskList = await this.taskListRepository.findOne({
        where: { id: taskListId },
      });
      return await this.taskItemService.deleteTaskItems(taskList);
    } catch (error) {
      throw new BadRequestException('Not Delete Task List all tasks', error);
    }
  }

  async deleteTaskListAllList(taskListId: number) {
    try {
      const taskList = await this.taskListRepository.findOne({
        where: { id: taskListId },
      });
      await this.taskItemService.deleteTaskItems(taskList);
      return await this.taskListRepository.delete(taskListId);
    } catch (error) {
      throw new BadRequestException('Not Delete Task List all list', error);
    }
  }
}
