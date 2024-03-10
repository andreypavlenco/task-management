import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskItem } from 'src/models/taskItem.entity';
import { Repository } from 'typeorm';
import { TaskList } from 'src/models/taskList.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class TaskItemService {
  constructor(
  
    @InjectRepository(TaskItem) private taskItemRepository: Repository<TaskItem>,
    @InjectRepository(TaskList) private taskListRepository: Repository<TaskList>,
    @InjectRepository(User) private userRepository: Repository<User>
  
  ) {}

  async forEachDescription(description: string) {
    const taskItem = new TaskItem();
    taskItem.description = description;
    await this.taskItemRepository.save(taskItem);
    return taskItem;
  }

  async forEachDeleteDescription(findTaskItem) {
    const taskItem = new TaskItem();
    await this.taskItemRepository.delete(findTaskItem);
    return taskItem;
  }

  async createTaskItem(taskItems: string[]) {
    const promisTaskItem = taskItems.map((description) =>
      this.forEachDescription(description),
    );
    const taskItem = await Promise.all(promisTaskItem);
    return taskItem;
  }

  async updateTaskItem(listId: number, itemId: number, updateDescription: string, userId: number) {
       await this.taskItemRepository.update( itemId, {description: updateDescription})
      return await this.userRepository.findOne({
            select:  ["id", "name", "email"],
           relations: { taskList: { taskItem: true } },
            where: { id: userId, taskList: { taskItem: { id:itemId} }},
         
    });

}
 
     async deleteTaskItems(idTaskList) {
     try {
        const findTaskItem =  await this.taskItemRepository.find({where:{taskList: idTaskList}})
       return await this.forEachDeleteDescription(findTaskItem)
     } catch (error) {
       return error;
     }
  }


  async deleteTaskItem(idTaskItem) {
    try {
    return await this.taskItemRepository.delete(idTaskItem)
    } catch (error) {
      return error;
    }
 }

 }


 