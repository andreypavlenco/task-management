import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TaskListService } from './taskList.service';
import { createTaskListDTO } from './dto';

@Controller('task')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTaskList(@Body() dto: createTaskListDTO, @Req() res) {
    return this.taskListService.createTaskList(dto, res.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-all-list')
  findTaskList(@Req() res) {
    return this.taskListService.findAllTaskList(res.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-one-list/:id')
  findOneTaskList(@Param('taskListId') taskListId: number, @Req() res) {
    return this.taskListService.findOneTaskList(taskListId, res.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateList/:id')
  updateTaskList(@Param('id') id: number, @Body('name') name: string) {
    return this.taskListService.updateTaskList(id, name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteListI  s/:id')
  DeleteTaskListItems(@Param('id') id: number) {
    return this.taskListService.deleteTaskListAllItems(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteList/:id')
  DeleteTaskList(@Param('id') id: number) {
    return this.taskListService.deleteTaskListAllList(id);
  }


}
